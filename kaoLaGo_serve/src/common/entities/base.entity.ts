import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  // 自动生成创建日期
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;

  // 创建人
  @Column({
    name: 'created_by',
    nullable: true,
    comment: '创建人',
  })
  createdBy?: string;

  // 自动生成更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  // 更新人
  @Column({
    name: 'updated_by',
    nullable: true,
    comment: '更新人',
  })
  updatedBy?: string;

  // 软删除
  @Column({
    name: 'is_deleted',
    default: 0,
    comment: '软删除 1删除 0未删除',
    select: false,
  })
  isDeleted: number;
}
