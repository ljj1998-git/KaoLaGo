import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('sys_menus')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '菜单id',
  })
  id: number;

  @Column({
    comment: '菜单类型 1:目录 2:菜单 3:按钮',
  })
  type: number;

  @Column({
    comment: '上级菜单id',
    nullable: true,
  })
  parentId?: number;

  @Column({
    comment: '菜单名称',
  })
  name: string;

  @Column({
    comment: '组件名称',
    nullable: true,
  })
  componentName?: string;

  @Column({
    comment: '组件路径',
    nullable: true,
  })
  componentPath?: string;

  @Column({
    comment: '重定向',
    nullable: true,
  })
  redirect?: string;

  @Column({
    comment: '菜单图标',
    nullable: true,
  })
  icon?: string;

  @Column({
    comment: '菜单路径',
    nullable: true,
  })
  route?: string;

  @Column({
    comment: '排序',
    nullable: true,
  })
  sort?: number;

  @Column({
    comment: '权限标识',
    nullable: true,
  })
  permission: string;

  @Column({
    comment: '状态 1:启用 0:禁用',
  })
  status: number;
}
