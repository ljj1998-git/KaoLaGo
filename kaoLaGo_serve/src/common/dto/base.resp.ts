import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResp {
  @ApiProperty({ description: '创建时间' })
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '创建人' })
  @Expose({ name: 'created_by' })
  createdBy: Date;

  @ApiProperty({ description: '更新时间' })
  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ description: '更新人' })
  @Expose({ name: 'updated_by' })
  updatedBy: Date;

  @ApiProperty({ description: '软删除 1删除 0未删除' })
  @Expose({ name: 'is_deleted' })
  isDeleted: number;
}
