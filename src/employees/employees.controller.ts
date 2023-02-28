import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { EmployeesService } from './employees.service';
import { SortTypes } from '../types';

@Controller('employee')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  async getEmployees(
    @Query('field') field: string,
    @Query('sort') sort: SortTypes,
  ) {
    return await this.employeeService.listEmployees(field, sort);
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
