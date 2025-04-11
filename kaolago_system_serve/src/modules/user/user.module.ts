import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/entities';
import { CryptoService } from '@/utils/crypto.util';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    RedisCacheModule,
  ],
  controllers: [UserController],
  providers: [UserService, CryptoService],
  exports: [],
})
export class UserModule {}
