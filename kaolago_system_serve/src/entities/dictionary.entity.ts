import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from './common/base.entity';

@Entity('sys_dictionary')
@Tree('closure-table')
export class DictionaryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '字典id',
  })
  id: number;

  @Column({
    comment: '字典key值',
    type: 'varchar',
    length: 50,
  })
  key: string;

  @Column({
    comment: '字典名称',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    comment: '字典值',
    type: 'varchar',
    length: 50,
  })
  value: string;

  @Column({
    comment: '状态',
  })
  status: number;

  @Column({
    comment: '字典描述',
    type: 'varchar',
    length: 200,
    default: null,
  })
  description?: string;

  @Column({
    comment: '父级字典id',
    nullable: true,
  })
  parentId: number | null;

  @TreeParent({
    onDelete: 'CASCADE',
  })
  parent: DictionaryEntity;

  @TreeChildren()
  children: DictionaryEntity[];
}
