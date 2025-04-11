import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './common/base.entity';

@Entity('k_question_type')
export class QuestionTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '题目类型id',
  })
  id: number;

  @Column({
    comment: '题目类型名称',
    length: 30,
  })
  name: string;

  @Column({
    comment: '描述',
  })
  description?: string;

  @Column({
    comment: '状态 0-禁用 1-启用',
    default: 1,
  })
  status: number;
}
