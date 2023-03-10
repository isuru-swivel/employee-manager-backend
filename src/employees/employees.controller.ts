import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { EmployeeResponseDto } from './dto/employeeResponse.dto';
import { EmployeesService } from './employees.service';
import { SortTypes, SortFields } from '../types';

@ApiTags('employee')
@Controller('employee')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  @ApiExtraModels(EmployeeResponseDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(EmployeeResponseDto),
    },
  })
  @ApiQuery({ name: 'field', enum: SortFields })
  @ApiQuery({ name: 'sort', enum: SortTypes })
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
