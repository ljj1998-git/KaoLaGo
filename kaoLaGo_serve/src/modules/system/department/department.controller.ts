import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import {
  CreateDepartmentReq,
  QueryDepartmentInfoReq,
  QueryDepartmentReq,
  QueryDepartmentTreeReq,
  UpdateDepartmentReq,
} from './dto/department.req';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CustomRequest } from '@/types/customRequest';
import { DepartmentTreeResp } from './dto/department.resp';

@Controller('department')
@ApiTags('部门管理')
@UseGuards(AuthGuard('jwt'))
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/create')
  @ApiOperation({ summary: '新增部门' })
  @ApiResponse({
    status: 200,
    description: '操作成功',
  })
  createDepartment(
    @Body() params: CreateDepartmentReq,
    @Req() req: CustomRequest,
  ) {
    return this.departmentService.createDepartment(params, req);
  }

  /** 删除部门 */
  @Delete('/delete')
  @ApiOperation({ summary: '删除部门' })
  deleteDepartment(
    @Query() params: QueryDepartmentInfoReq,
    @Req() req: CustomRequest,
  ) {
    return this.departmentService.deleteDepartment(params, req);
  }

  /** 修改部门 */
  @Put('/update')
  @ApiOperation({ summary: '修改部门' })
  updateDepartment(
    @Body() params: UpdateDepartmentReq,
    @Req() req: CustomRequest,
  ) {
    return this.departmentService.updateDepartment(params, req);
  }

  /** 查询部门列表 */
  @Post('/query')
  @ApiOperation({ summary: '查询部门列表' })
  getDepartmentList(@Body() params: QueryDepartmentReq) {
    return this.departmentService.getDepartmentList(params);
  }

  /** 查询部门树 */
  @Post('/queryTree')
  @ApiOperation({ summary: '查询部门树' })
  @ApiResponse({
    status: 200,
    description: '操作成功',
    type: DepartmentTreeResp,
    isArray: true,
  })
  getDepartmentTree(@Body() params: QueryDepartmentTreeReq) {
    return this.departmentService.getDepartmentTree(params);
  }

  /** 查询部门详情 */
  @Get('/info')
  @ApiOperation({ summary: '查询部门详情' })
  getDepartmentInfo(@Query() params: QueryDepartmentInfoReq) {
    return this.departmentService.getDepartmentInfo(params);
  }
}
