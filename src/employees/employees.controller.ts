import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Header,
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
  @Header('Access-Control-Allow-Origin', '*')
  async addEmployee(@Body() createEmployee: CreateEmployeeDto) {
    return await this.employeeService.addEmployee(createEmployee);
  }

  @Put(':empId')
  @Header('Access-Control-Allow-Origin', '*')
  async updateEmployee(
    @Param('empId') empId: string,
    @Body() updateEmployee: CreateEmployeeDto,
  ) {
    return await this.employeeService.updateEmployee(updateEmployee, empId);
  }

  @Delete(':empId')
  @Header('Access-Control-Allow-Origin', '*')
  async deleteEmployee(@Param('empId') empId: string) {
    return await this.employeeService.deleteEmployee(empId);
  }
}
