import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('sys_department')
export class DepartmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '部门id',
  })
  id: number;

  @Column({
    comment: '部门名称',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    comment: '部门编号',
  })
  code: string;

  @Column({
    comment: '部门描述',
    type: 'varchar',
    length: 200,
  })
  description: string;

  @Column({
    comment: '父级部门id',
    type: 'int',
    nullable: true,
  })
  parentId?: number;

  @Column({
    comment: '排序',
    type: 'int',
    default: 0,
  })
  sort: number;

  @Column({
    comment: '是否启用 1是 0否',
    type: 'int',
    default: 1,
  })
  status: number;

  @TreeParent()
  parent: DepartmentEntity;

  @TreeChildren()
  children: DepartmentEntity[];

  @OneToMany(() => UserEntity, (user) => user.department)
  users: UserEntity[];
}
