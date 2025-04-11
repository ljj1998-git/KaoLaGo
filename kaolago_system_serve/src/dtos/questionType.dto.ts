import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddQuestionTypeDto {
  @ApiProperty({ description: '题目类型名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '题目类型描述' })
  description: string;
}
