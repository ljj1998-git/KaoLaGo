import { PaginationDto } from '@/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/** 新增部门DTO */
export class CreateDepartmentReq {
  @ApiProperty({ description: '部门名称' })
  @IsNotEmpty({ message: '部门名称不能为空' })
  name: string;

  @ApiProperty({ description: '部门编号' })
  @IsNotEmpty({ message: '部门编号不能为空' })
  code: string;

  @ApiProperty({ description: '部门描述' })
  description?: string;

  @ApiProperty({ description: '父级部门ID' })
  parentId?: number;

  @ApiProperty({ description: '排序' })
  @IsNotEmpty({ message: '排序不能为空' })
  sort: number;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status: number;
}

/** 新增部门DTO */
export class UpdateDepartmentReq extends CreateDepartmentReq {
  @ApiProperty({ description: '部门ID' })
  @IsNotEmpty({ message: '部门ID不能为空' })
  id: number;
}

/** 查询部门列表DTO */
export class QueryDepartmentReq extends PaginationDto {
  @ApiProperty({ description: '部门名称' })
  name?: string;

  @ApiProperty({ description: '部门编号' })
  code?: string;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status?: number;
}

export class QueryDepartmentTreeReq {
  @ApiProperty({ description: '部门名称' })
  name?: string;

  @ApiProperty({ description: '部门编号' })
  code?: string;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status?: number;
}

export class QueryDepartmentInfoReq {
  @ApiProperty({ description: '部门ID' })
  @IsNotEmpty({ message: '部门ID不能为空' })
  id: number;
}
