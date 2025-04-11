import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjaxResultjaxResponesModule } from '@/common/modules/ajax-responese/ajaxRespones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    AjaxResultjaxResponesModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
