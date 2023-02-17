import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { EmployeesService } from './employees.service';

@Controller('employee')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  async getEmployees() {
    return await this.employeeService.listEmployees();
  }

  @Post()
  async addEmployee(@Body() createEmployee: CreateEmployeeDto) {
    return await this.employeeService.addEmployee(createEmployee);
  }

  @Put(':empId')
  async updateEmployee(
    @Param('empId') empId: string,
    @Body() updateEmployee: CreateEmployeeDto,
  ) {
    return await this.employeeService.updateEmployee(updateEmployee, empId);
  }

  @Delete(':empId')
  async deleteEmployee(@Param('empId') empId: string) {
    return await this.employeeService.deleteEmployee(empId);
  }
}
