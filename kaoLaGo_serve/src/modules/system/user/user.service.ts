import {
  BindRoleDto,
  LoginDto,
  QueryUserListReq,
  RegisterDto,
  UpdateUserStatusReq,
} from '@/modules/system/user/dto/user.req';
import { RESPONSE_CODE } from '@/constants/index';
import { UserEntity } from './entities/user.entity';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { AuthService } from '@/modules/system/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '@/common/modules/redis-cache/redis-cache.service';
import * as svgCaptcha from 'svg-captcha';
import { CryptoService } from '@/util/crypto.util';
import { RoleEntity } from '../role/entities/role.entity';
import { CustomRequest } from '@/types/customRequest';
import { DeleteDto } from '@/common/dto/base.dto';
import { DepartmentEntity } from '../department/entities/department.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleEntity: Repository<RoleEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentEntity: Repository<DepartmentEntity>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cryptoService: CryptoService,
  ) {}

  /** @des 用户注册 */
  async register(registerDto: RegisterDto, req: CustomRequest) {
    const { username } = req.user;
    const { password, ...otherParams } = registerDto;

    const r1 = await this.userEntity.findOneBy({ mobile: otherParams.mobile });
    if (r1) {
      // return this.r.error('当前手机号已注册');
    }
    try {
      const department = await this.departmentEntity.findOneBy({
        id: otherParams.departmentId,
      });
      await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          ...otherParams,
          password: await this.cryptoService.careatePassword(
            await this.cryptoService.decryptPassword(password),
          ),
          department: department,
          createdBy: username,
        })
        .execute();
      // return this.r.success(null, '用户注册成功');
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 用户登录 */
  async login(loginDto: LoginDto, session) {
    const { mobile, password, username, captcha } = loginDto;
    //get方式获取的验证码定义的
    const sessionCode = String(session.code).toLowerCase();
    if (sessionCode !== captcha) {
      // return this.r.error('验证码错误');
    }
    const r1 = await this.userEntity.findOne({
      where: { username },
      select: ['password', 'id', 'mobile'],
    });
    if (!r1) {
      // return this.r.error('用户不存在');
    }
    // 校验密码
    const passwordSame = await this.cryptoService.checkPassword(
      password,
      r1.password,
    );
    if (!passwordSame) {
      // return this.r.error('密码错误');
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
    // return this.r.success({ token }, '登录成功');
  }

  /** @des 获取验证码 */
  async getCaptcha(session) {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 50,
      width: 110,
      height: 38,
      background: '#fff', //背景颜色
    });
    session.code = captcha.text; //session保存验证码
    // return this.r.success(captcha.data);
  }

  /** @des 更新用户 */
  async updateUser(params: UpdateUserStatusReq, req: CustomRequest) {
    const { id, roleIds, departmentId } = params;
    const { username } = req.user;
    try {
      const roles = await this.roleEntity.findBy({ id: In(roleIds) });
      const department = await this.departmentEntity.findOneBy({
        id: departmentId,
      });

      await this.userEntity.save({
        ...params,
        roles,
        department,
        updatedBy: username,
      });
      // return this.r.success(null, '用户更新成功');
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 获取用户列表 */
  async getUserList(params: QueryUserListReq) {
    const { pageNum, pageSize, username = '', status, departmentId } = params;
    try {
      const [result, total] = await this.userEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: {
          username: ILike('%' + username + '%'),
          status,
          isDeleted: 0,
          department: {
            id: departmentId,
          },
        },
        relations: ['roles', 'department'],
      });

      // return this.r.success({
      //   total,
      //   list: result,
      // });
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 获取用户详情 */
  async getUserInfo(id: number) {
    try {
      const user = await this.userEntity
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.department', 'department')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.id = :id', { id })
        .getOne();

      const { department, roles, ...otherRes } = user;
      const _user = {
        ...otherRes,
        departmentId: department.id,
        roleIds: roles.map((item) => item.id),
      };
      // return this.r.success(_user);
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 删除用户 */
  async deleteUser(params: DeleteDto, req: CustomRequest) {
    const { ids } = params;
    const { username } = req.user;
    try {
      await this.userEntity
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          isDeleted: 1,
          updatedBy: username,
          updatedAt: new Date(),
        })
        .where('id IN (:...ids)', { ids })
        .execute();
      // return this.r.success();
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 绑定角色 */
  async bindRole(params: BindRoleDto) {
    const { userId, roleIds } = params;
    try {
      const user = await this.userEntity.findOne({
        where: { id: userId },
        relations: ['roles'],
      });
      const roles = await this.roleEntity.findBy({
        id: In(roleIds),
      });
      user.roles = roles;
      await this.userEntity.save(user);
      // return this.r.success();
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** @des 获取已绑定角色 */
  async getBindRole(id: number) {
    try {
      const user = await this.userEntity.findOne({
        where: { id },
        relations: ['roles'],
      });
      const roleIds = user.roles.map((item) => item.id);
      // return this.r.success(roleIds);
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
