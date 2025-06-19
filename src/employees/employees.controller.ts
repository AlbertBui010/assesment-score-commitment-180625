import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeCommitmentStatusDto } from './dto/employee-commitment-status.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':id/commitment')
  async getCommitmentStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EmployeeCommitmentStatusDto> {
    return this.employeesService.getCurrentCommitmentStatus(id);
  }
}