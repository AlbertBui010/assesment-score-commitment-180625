import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CommitmentHistory } from '../commitment-history/commitment-history.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => CommitmentHistory, (history) => history.employee)
  histories: CommitmentHistory[];
}