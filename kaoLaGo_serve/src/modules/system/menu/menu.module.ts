import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuEntity } from '@/modules/system/menu/entities/menu.entity';
import { MenuController } from '@/modules/system/menu/menu.controller';
import { MenuService } from '@/modules/system/menu/menu.service';
import { AjaxResultjaxResponesModule } from '@/common/modules/ajax-responese/ajaxRespones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    AjaxResultjaxResponesModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [],
})
export class SysMenuModule {}
