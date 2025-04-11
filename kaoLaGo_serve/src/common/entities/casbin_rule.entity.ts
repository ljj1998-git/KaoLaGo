import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('casbin_rule')
export class CasbinRule {
  @Column('varchar', { length: 2 })
  type: string;

  @PrimaryColumn('varchar', { length: 20 })
  p1: string;

  @Column('varchar', { length: 20 })
  p2: string;

  @Column('varchar', { length: 20 })
  p3: string;
}
