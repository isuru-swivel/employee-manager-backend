import { Model } from 'mongoose';
import { Employee } from '../interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { SortTypes } from '../types';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_MODEL')
    private employeeModel: Model<Employee>,
  ) {}

  async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const createdCat = new this.employeeModel(createEmployeeDto);
      return createdCat.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEmployee(
    updateEmployeeDto: CreateEmployeeDto,
    employeeId: string,
  ) {
    try {
      return await this.employeeModel.updateOne(
        { _id: employeeId },
        updateEmployeeDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async listEmployees(field: string, sort: SortTypes): Promise<Employee[]> {
    try {
      return await this.employeeModel
        .find()
        .sort([[field, sort]])
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployee(employeeId: string) {
    try {
      return await this.employeeModel.deleteOne({ _id: employeeId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
