import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import config from '@/config';

import { AuthModule } from '@/modules/system/auth/auth.module';
import { GlobalConstantsModule } from '@/constants';
import { UserModule } from '@/modules/system/user/user.module';
import { SysMenuModule } from '@/modules/system/menu/menu.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { DepartmentModule } from './modules/system/department/department.module';
import { RoleModule } from './modules/system/role/role.module';

@Global()
@Module({
  imports: [
    GlobalConstantsModule,
    ...config,
    // AuthModule,
    UserModule,
    // SysMenuModule,
    // DepartmentModule,
    // RoleModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
