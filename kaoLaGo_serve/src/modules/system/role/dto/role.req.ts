import { PaginationDto } from '@/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleReq extends PaginationDto {
  @ApiProperty({ description: '角色名' })
  @IsString({ message: '角色名不能为空' })
  name: string;

  @ApiProperty({ description: '角色编码' })
  @IsString({ message: '角色编码不能为空' })
  code: string;

  @ApiProperty({ description: '排序' })
  sort?: number;

  @ApiProperty({ description: '角色描述' })
  description?: string;
}

export class QueryRoleReq extends PaginationDto {
  @ApiProperty({ description: '角色名' })
  name?: string;

  @ApiProperty({ description: '角色编码' })
  code?: string;
}
