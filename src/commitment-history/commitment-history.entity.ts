import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity('commitment_history')
export class CommitmentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.histories, { eager: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ type: 'int' })
  evaluator_score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  evaluated_at: Date;
}