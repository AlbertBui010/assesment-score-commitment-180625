import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { CommitmentHistory } from '../commitment-history/commitment-history.entity';
import { CommitmentLevel } from '../commitment-levels/commitment-level.entity';

describe('EmployeesService', () => {
  let service: EmployeesService;

  const mockEmployeeRepo = {
    findOne: jest.fn(),
  };
  const mockHistoryRepo = {
    findOne: jest.fn(),
  };

  // Tạo mock cho createQueryBuilder và getOne
  const mockGetOne = jest.fn();
  const mockLevelRepo = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getOne: mockGetOne,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: getRepositoryToken(Employee), useValue: mockEmployeeRepo },
        { provide: getRepositoryToken(CommitmentHistory), useValue: mockHistoryRepo },
        { provide: getRepositoryToken(CommitmentLevel), useValue: mockLevelRepo },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);

    // Reset mock trước mỗi test
    mockEmployeeRepo.findOne.mockReset();
    mockHistoryRepo.findOne.mockReset();
    mockGetOne.mockReset();
  });

  it('should return current commitment status', async () => {
    mockEmployeeRepo.findOne.mockResolvedValue({ id: 1, name: 'Alice' });
    mockHistoryRepo.findOne.mockResolvedValue({
      evaluator_score: 85,
      evaluated_at: new Date('2024-01-01'),
    });
    mockGetOne.mockResolvedValue({
      label: 'Good',
      color_code: '#00FF00',
    });

    const result = await service.getCurrentCommitmentStatus(1);
    expect(result).toEqual({
      employeeId: 1,
      employeeName: 'Alice',
      latestScore: 85,
      evaluatedAt: new Date('2024-01-01'),
      levelLabel: 'Good',
      colorCode: '#00FF00',
    });
  });

  it('should return Unknown if no level found', async () => {
    mockEmployeeRepo.findOne.mockResolvedValue({ id: 2, name: 'Bob' });
    mockHistoryRepo.findOne.mockResolvedValue({
      evaluator_score: 10,
      evaluated_at: new Date('2024-02-01'),
    });
    mockGetOne.mockResolvedValue(undefined);

    const result = await service.getCurrentCommitmentStatus(2);
    expect(result.levelLabel).toBe('Unknown');
    expect(result.colorCode).toBe('#cccccc');
  });

  it('should throw NotFoundException if employee not found', async () => {
    mockEmployeeRepo.findOne.mockResolvedValue(undefined);

    await expect(service.getCurrentCommitmentStatus(999)).rejects.toThrow('Employee not found');
  });

  it('should throw NotFoundException if no commitment history', async () => {
    mockEmployeeRepo.findOne.mockResolvedValue({ id: 3, name: 'Carol' });
    mockHistoryRepo.findOne.mockResolvedValue(undefined);

    await expect(service.getCurrentCommitmentStatus(3)).rejects.toThrow('No commitment history found');
  });
});