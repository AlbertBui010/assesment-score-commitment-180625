import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employees/employee.entity';
import { CommitmentLevel } from './commitment-levels/commitment-level.entity';
import { CommitmentHistory } from './commitment-history/commitment-history.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const employeeRepo = app.get(getRepositoryToken(Employee));
    const levelRepo = app.get(getRepositoryToken(CommitmentLevel));
    const historyRepo = app.get(getRepositoryToken(CommitmentHistory));

    // Xóa dữ liệu cũ (nếu muốn)
    await historyRepo.createQueryBuilder().delete().execute();
    await employeeRepo.createQueryBuilder().delete().execute();
    await levelRepo.createQueryBuilder().delete().execute();

    // Seed employees
    const alice = await employeeRepo.save({ name: 'Alice' });
    const bob = await employeeRepo.save({ name: 'Bob' });
    const carol = await employeeRepo.save({ name: 'Carol' });

    // Seed commitment levels
    await levelRepo.save([
        { score_min: 0, score_max: 39, label: 'Issue', color_code: '#FF0000' },
        { score_min: 40, score_max: 44, label: 'Potential Issue', color_code: '#FFA500' },
        { score_min: 45, score_max: 49, label: 'Good', color_code: '#00FF00' },
        { score_min: 49, score_max: 100, label: 'Excellent', color_code: '#0000FF' },
    ]);

    // Seed commitment history
    await historyRepo.save([
        { employee: alice, evaluator_score: 45, evaluated_at: new Date('2025-06-01') },
        { employee: bob, evaluator_score: 72, evaluated_at: new Date('2025-06-01') },
        { employee: carol, evaluator_score: 88, evaluated_at: new Date('2025-06-01') },
    ]);

    await app.close();
    console.log('Seed data completed!');
}

bootstrap();