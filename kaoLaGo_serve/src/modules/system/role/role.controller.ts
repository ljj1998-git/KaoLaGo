import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMenuReq } from '../menu/dto/menu.req';
import { CustomRequest } from '@/types/customRequest';
import { CreateRoleReq, QueryRoleReq } from './dto/role.req';
import { JwtAuthGuard } from '@/guards/JwtAuth.guard';

@ApiTags('系统角色管理')
@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '新增角色' })
  @Post('/create')
  createRole(@Body() createRoleReq: CreateRoleReq, @Req() req: CustomRequest) {
    return this.roleService.createRole(createRoleReq, req);
  }

  @ApiOperation({ summary: '获取角色列表' })
  @Post('/list')
  getRoleList(@Body() createRoleReq: QueryRoleReq) {
    return this.roleService.getRoleList(createRoleReq);
  }

  @ApiOperation({ summary: '删除角色' })
  @Post('/delete')
  deleteRole(@Body() roleId: number) {
    return this.roleService.deleteRole(roleId);
  }

  // @ApiOperation({ summary: '更新角色' })
  // @Post('/update')
  // updateRole(@Body() createMenuReq: CreateMenuReq, @Req() req: CustomRequest) {
  //   return this.roleService.updateRole(createMenuReq, req);
  // }
}
