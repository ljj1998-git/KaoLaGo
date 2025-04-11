import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { Redis } from 'ioredis';
import { RedisCacheService } from '@/common/modules/redis-cache/redis-cache.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 初始化redis，redis参数建议配置到外部配置文件引入
    ClientsModule.registerAsync([
      {
        name: 'REDIS_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          options: {
            host: configService.get('db').redis.host,
          },
          transport: Transport.REDIS,
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RedisCacheService, Redis],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
