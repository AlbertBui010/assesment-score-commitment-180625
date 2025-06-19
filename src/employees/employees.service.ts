import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CommitmentHistory } from '../commitment-history/commitment-history.entity';
import { CommitmentLevel } from '../commitment-levels/commitment-level.entity';
import { EmployeeCommitmentStatusDto } from './dto/employee-commitment-status.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(CommitmentHistory)
        private historyRepo: Repository<CommitmentHistory>,
        @InjectRepository(CommitmentLevel)
        private levelRepo: Repository<CommitmentLevel>,
    ) { }

    async getCurrentCommitmentStatus(employeeId: number): Promise<EmployeeCommitmentStatusDto> {
        const employee = await this.employeeRepo.findOne({ where: { id: employeeId } });
        if (!employee) throw new NotFoundException('Employee not found');

        const latestHistory = await this.historyRepo.findOne({
            where: { employee: { id: employeeId } },
            order: { evaluated_at: 'DESC' },
        });
        if (!latestHistory) throw new NotFoundException('No commitment history found');

        const level = await this.levelRepo.createQueryBuilder('level')
            .where(':score BETWEEN level.score_min AND level.score_max', { score: latestHistory.evaluator_score })
            .getOne();

        return {
            employeeId: employee.id,
            employeeName: employee.name,
            latestScore: Number(latestHistory.evaluator_score),
            evaluatedAt: latestHistory.evaluated_at,
            levelLabel: level?.label || 'Unknown',
            colorCode: level?.color_code || '#cccccc',
        };
    }
}
