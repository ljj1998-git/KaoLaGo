import {
  CreateMenuReq,
  QueryMenuInfoReq,
  UpdateMenuReq,
} from '@/modules/system/menu/dto/menu.req';
import { MenuService } from '@/modules/system/menu/menu.service';
import { CustomRequest } from '@/types/customRequest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/guards/roles/roles.decorator';
import { JwtAuthGuard } from '@/guards/JwtAuth.guard';

@Controller('menu')
@ApiTags('系统菜单管理')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(public readonly menuService: MenuService) {}

  /** 新增菜单 */
  @Post('/create')
  @ApiOperation({ summary: '新增菜单' })
  createMenu(@Body() createMenuReq: CreateMenuReq, @Req() req: CustomRequest) {
    return this.menuService.createMenu(createMenuReq, req);
  }

  /** 删除菜单 */
  @Delete('/delete')
  @ApiOperation({ summary: '删除菜单' })
  deleteMenu(@Query() params: QueryMenuInfoReq, @Req() req: CustomRequest) {
    return this.menuService.deleteMenu(params, req);
  }

  /** 更新菜单 */
  @Put('/update')
  @ApiOperation({ summary: '更新菜单' })
  updateMenu(@Body() createMenuReq: UpdateMenuReq, @Req() req: CustomRequest) {
    return this.menuService.updateMenu(createMenuReq, req);
  }

  /** 获取菜单树 */
  @Get('/queryTree')
  @SetMetadata('roles', ['admin'])
  @ApiOperation({ summary: '获取菜单列表' })
  getMenuList() {
    return this.menuService.getMenuTree();
  }

  /** 获取菜单详情 */
  @Get('/info')
  @ApiOperation({ summary: '获取菜单详情' })
  getMenuInfo(@Query() params: QueryMenuInfoReq) {
    return this.menuService.getMenuInfo(params);
  }
}
