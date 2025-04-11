import { Module } from '@nestjs/common';
import { UserController } from '@/modules/system/user/user.controller';
import { UserService } from '@/modules/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { RedisCacheModule } from '@/common/modules/redis-cache/redis-cache.module';
import { CryptoService } from '@/util/crypto.util';
import { RoleModule } from '../role/role.module';
import { RoleEntity } from '../role/entities/role.entity';
import { DepartmentModule } from '../department/department.module';
import { DepartmentEntity } from '../department/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, DepartmentEntity]),
    AuthModule,
    RedisCacheModule, // 导入Redis模块
    RoleModule,
    DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService, CryptoService],
  exports: [],
})
export class UserModule {}
