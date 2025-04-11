import { BaseResp } from '@/common/dto/base.resp';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentTreeResp extends BaseResp {
  @ApiProperty({ description: '部门id' })
  id: number;

  @ApiProperty({ description: '部门名称' })
  name: string;

  @ApiProperty({ description: '父级部门id' })
  parentId: number;

  @ApiProperty({ description: '部门描述' })
  description?: string;

  @ApiProperty({ description: '排序' })
  sort: number;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status: boolean;

  @ApiProperty({
    description: '子部门',
    type: DepartmentTreeResp,
    isArray: true,
  })
  children?: DepartmentTreeResp[];
}
