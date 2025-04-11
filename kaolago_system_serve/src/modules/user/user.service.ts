import { RESPONSE_CODE } from '@/constants/index';
import { LoginDto, RegisterDto } from '@/dtos';
import { UserEntity } from '@/entities/index';
import { CustomRequest } from '@/types';
import { CryptoService } from '@/utils/crypto.util';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  /** @des 用户注册 */
  async register(registerDto: RegisterDto, req: CustomRequest) {
    // const { username } = req.user;
    const { password, ...otherParams } = registerDto;

    const r1 = await this.userEntity.findOneBy({ mobile: otherParams.mobile });
    if (r1) {
      // return this.r.error('当前手机号已注册');
    }
    try {
      // const department = await this.departmentEntity.findOneBy({
      //   id: otherParams.departmentId,
      // });
      await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          ...otherParams,
          password: await this.cryptoService.careatePassword(
            await this.cryptoService.decryptPassword(password),
          ),
          // department: department,
          // createdBy: username,
        })
        .execute();
      return { message: '注册成功', data: null };
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 用户登录 */
  async login(loginDto: LoginDto) {
    const { mobile, password, username } = loginDto;
    const r1 = await this.userEntity.findOne({
      where: { username },
      select: ['password', 'id', 'mobile'],
    });
    if (!r1) {
      return '用户不存在';
    }
    // 校验密码
    const passwordSame = await this.cryptoService.checkPassword(
      password,
      r1.password,
    );
    if (!passwordSame) {
      return '密码错误';
    }
    const { id } = r1;
    const token = this.authService.getToken({ id, username, mobile });
    // 存入redis缓存
    this.redisCacheService.set(
      String(id),
      token,
      this.configService.get('jwt').expiration,
    );
    // 返回token
    return { data: { token }, message: '登录成功' };
  }
}
