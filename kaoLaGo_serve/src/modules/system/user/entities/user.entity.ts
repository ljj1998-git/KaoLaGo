import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { DepartmentEntity } from '../../department/entities/department.entity';

@Entity('sys_users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '用户id',
  })
  id: number;

  @Column({
    comment: '用户名',
    length: 30,
  })
  username: string;

  @Column({
    comment: '密码',
    select: false,
  })
  password: string;

  @Column({
    comment: '手机号',
  })
  mobile: string;

  @Column({
    comment: '昵称',
    length: 30,
  })
  nickname: string;

  // @Column({
  //   comment: '部门id',
  // })
  // departmentId: number;

  @Column({
    comment: '邮箱',
  })
  email?: string;

  @Column({
    comment: '性别 1-男 2-女',
  })
  sex: number;

  @Column({
    comment: '描述',
  })
  description?: string;

  @Column({
    comment: '状态 0-禁用 1-启用',
    default: 1,
  })
  status: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.users)
  @JoinColumn({ name: 'departmentId' })
  department: Relation<DepartmentEntity>;

  @ManyToMany(() => RoleEntity, (role) => role.id)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity[]>;
}
