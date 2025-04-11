import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  pageNum?: number = 1; // 默认第一页

  @IsOptional()
  @IsInt()
  @IsPositive()
  pageSize?: number = 10; // 默认每页10条记录
}

export class DeleteDto {
  @ApiProperty({ description: '删除id' })
  ids: string | number[];
}

export class IdDto {
  @ApiProperty({ description: 'ID' })
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}
