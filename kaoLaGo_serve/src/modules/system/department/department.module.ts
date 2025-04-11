import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentEntity } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjaxResultjaxResponesModule } from '@/common/modules/ajax-responese/ajaxRespones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity]),
    AjaxResultjaxResponesModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
