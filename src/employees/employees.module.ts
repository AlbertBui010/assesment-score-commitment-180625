import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { CommitmentHistory } from '../commitment-history/commitment-history.entity';
import { CommitmentLevel } from '../commitment-levels/commitment-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CommitmentHistory, CommitmentLevel])],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
