import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            getCurrentCommitmentStatus: jest.fn().mockResolvedValue({
              employeeId: 1,
              employeeName: 'Alice',
              latestScore: 85,
              evaluatedAt: new Date('2024-01-01'),
              levelLabel: 'Good',
              colorCode: '#00FF00',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should return commitment status', async () => {
    const result = await controller.getCommitmentStatus(1);
    expect(result.employeeId).toBe(1);
    expect(result.levelLabel).toBe('Good');
  });
});