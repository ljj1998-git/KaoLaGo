import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/system/auth/auth.controller';
import { AuthService } from '@/modules/system/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasbinRule } from '@/common/entities/casbin_rule.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '@/common/modules/redis-cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CasbinRule]), // 导入 TypeORM 模块和 User 实体
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('jwt').secret;
        const expiration = configService.get('jwt').expiration + 's';
        return {
          secret: secret, //jwt密钥
          signOptions: { expiresIn: expiration },
        };
      },
      inject: [ConfigService],
    }),
    RedisCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
