import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { EmployeeResponseDto } from './dto/employeeResponse.dto';
import { EmployeesService } from './employees.service';

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
