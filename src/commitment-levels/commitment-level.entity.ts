import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commitment_levels')
export class CommitmentLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  score_min: number;

  @Column({ type: 'int' })
  score_max: number;

  @Column({ length: 50 })
  label: string;

  @Column({ length: 7 })
  color_code: string;
}