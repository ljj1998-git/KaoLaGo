import { PaginationDto } from '@/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码' })
  password?: string;

  @ApiProperty({ description: '部门id' })
  departmentId: number;

  @ApiProperty({ description: '角色id（多个）' })
  roleIds: number[];

  @ApiProperty({ description: '手机号' })
  mobile: string;
}

export class LoginDto {
  @IsString({ message: '用户名不能为空' })
  username: string;

  @IsString()
  password: string;

  @IsString()
  captcha: string;

  // @IsPhoneNumber()
  mobile: string;
}

export class QueryUserListReq extends PaginationDto {
  @ApiProperty({ description: '用户名' })
  username?: string;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status?: number;

  @ApiProperty({ description: '部门ID' })
  departmentId?: number;
}

export class UpdateUserStatusReq extends RegisterDto {
  @ApiProperty({ description: '用户ID' })
  id: number;
}

export class BindRoleDto {
  @ApiProperty({ description: '多个角色ID' })
  roleIds: number[];

  @ApiProperty({ description: '用户ID' })
  userId: number;
}
