import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('sys_roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '角色id',
  })
  id: number;

  @Column({
    comment: '角色名称',
  })
  name: string;

  @Column({
    comment: '角色编码',
  })
  code: string;

  @Column({
    comment: '排序',
    nullable: true,
  })
  sort?: number;

  @Column({
    comment: '描述',
    nullable: true,
  })
  description?: string;
}
