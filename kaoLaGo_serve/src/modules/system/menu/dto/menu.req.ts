import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateMenuReq {
  @ApiProperty({ description: '菜单类型 1:目录 2:菜单 3:按钮' })
  @IsNumber()
  @IsNotEmpty({ message: '菜单类型不能为空' })
  type: number;

  @ApiProperty({ description: '父级id' })
  parentId?: number;

  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  name: string;

  @ApiProperty({ description: '菜单路径' })
  route?: string;

  @ApiProperty({ description: '组件路径' })
  componentPath?: string;

  @ApiProperty({ description: '排序' })
  sort?: number;

  @ApiProperty({ description: '状态 0:禁用 1:启用' })
  status?: number;

  @ApiProperty({ description: '图标' })
  icon?: string;
}

export class UpdateMenuReq extends CreateMenuReq {
  @ApiProperty({ description: '菜单id' })
  id: number;
}

export class QueryMenuInfoReq {
  @ApiProperty({ description: '菜单id' })
  id: number;
}
