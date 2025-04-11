import { ConstantsProvider } from '@/constants';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Enforcer, newEnforcer } from 'casbin';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisCacheService } from '@/common/modules/redis-cache/redis-cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CasbinRule } from '@/common/entities/casbin_rule.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const PDFParser = require('pdf2json');

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly constants: ConstantsProvider,
    @InjectRepository(CasbinRule)
    private casbinRule: Repository<CasbinRule>,
    private jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    const secret = configService.get('jwt').secret;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //校验逻辑token 已封装
      ignoreExpiration: false,
      secretOrKey: secret,
      // validate函数第一个参数返回req请求对象
      passReqToCallback: true,
    });
  }

  private enforcerIns: Enforcer;

  async getPermission(
    p1: string = '1',
    p2: string = '数据1',
    p3: string = '1',
  ): Promise<any> {
    // 初始化 casbin规则
    await this.initCasbin();

    // const pdfParser = new PDFParser();

    // pdfParser.on('pdfParser_dataReady', (pdfData) => {
    //   const textContent = pdfData.Pages.map((page) =>
    //     page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(' '),
    //   ).join('\n');
    //   console.log(textContent);
    // });
    // pdfParser.loadPDF('src/service/demo1.pdf').then((res) => {
    //   console.log(res);
    // });

    const res = await this.enforcerIns.enforce(p1, p2, p3);
    if (res) {
      return 'ok';
    } else {
      return 'error';
    }
  }

  private async initCasbin() {
    try {
      this.enforcerIns = await newEnforcer(this.constants.Casbin.CONFIG_PATH);
      const res = await this.casbinRule.find();
      const policy = res.map((item) => {
        return [item.p1, item.p2, item.p3];
      });
      await this.enforcerIns.addPolicies(policy); //批量添加
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  /**
   * 生成token
   */
  getToken(payload: any): string {
    return this.jwt.sign(payload);
  }

  /**
   * 验证token
   * @param payload
   */
  async validate(req, payload) {
    const { id } = payload;
    // 传入的token
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    //从redis中取对应的token
    const cacheToken = await this.redisCacheService.get(id); //取不出来，说明已过期
    //1.redis中没有token
    if (!cacheToken) {
      throw new UnauthorizedException('token已过期');
    }
    //2.token不同的话，则在其他地方登录
    if (token != cacheToken) {
      throw new UnauthorizedException('该账号已在其他地方登录');
    }
    // token续传,通过重置redis过期时间
    this.redisCacheService.set(
      id,
      token,
      this.configService.get('jwt').expiration,
    );
    // token
    return { id: payload.id, username: payload.username };
  }
}
