import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDictionaryDto {
  @ApiProperty({ description: '字典名称' })
  @IsNotEmpty({ message: '字典名称不能为空' })
  name: string;

  @ApiProperty({ description: '父级字典id' })
  parentId: number | null;

  @ApiProperty({ description: '字典key值' })
  @IsNotEmpty({ message: '字典key值不能为空' })
  key: string;

  @ApiProperty({ description: '字典值' })
  @IsNotEmpty({ message: '字典值不能为空' })
  value: string;

  @ApiProperty({ description: '字典状态' })
  @IsNotEmpty({ message: '字典状态不能为空' })
  status: number;

  @ApiProperty({ description: '字典描述' })
  description?: string;
}

export class SearchDictionaryDto {
  @ApiProperty({ description: '字典名称' })
  name?: string;
}

export class UpdateDictionaryDto extends CreateDictionaryDto {
  @ApiProperty({ description: '字典id' })
  @IsNotEmpty({ message: '字典id不能为空' })
  id: number;
}
