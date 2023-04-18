import { Model } from 'mongoose';
import { Employee } from '../interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SortTypes } from '../types';
import { Logger } from 'nestjs-pino';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_MODEL')
    private employeeModel: Model<Employee>,
    private readonly logger: Logger,
  ) {}

  async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      this.logger.log('adding employee');
      const createdEmployee = new this.employeeModel(createEmployeeDto);
      return createdEmployee.save();
    } catch (error) {
      this.logger.error('error while adding employee', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async updateEmployee(
    updateEmployeeDto: CreateEmployeeDto,
    employeeId: string,
  ) {
    try {
      this.logger.log('updating employee');
      return await this.employeeModel.updateOne(
        { _id: employeeId },
        updateEmployeeDto,
      );
    } catch (error) {
      this.logger.error('error while update employee', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async listEmployees(field: string, sort: SortTypes): Promise<Employee[]> {
    try {
      if (!field) field = 'createdAt';
      if (!sort) sort = SortTypes.asc;

      this.logger.log('getting employees');
      return await this.employeeModel
        .find()
        .sort([[field, sort]])
        .exec();
    } catch (error) {
      this.logger.error('error while getting employee', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployee(employeeId: string) {
    try {
      this.logger.log('deleting employee');
      return await this.employeeModel.deleteOne({ _id: employeeId });
    } catch (error) {
      this.logger.error('error while deleting employee', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
