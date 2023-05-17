import { Model } from 'mongoose';
import { Employee } from '../interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_MODEL')
    private employeeModel: Model<Employee>,
    private readonly logger: Logger,
  ) {}

  async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    //add new employee
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
    //update employee and return updated record
    try {
      this.logger.log('updating employee');
      return this.employeeModel.findOneAndUpdate(
        { _id: employeeId },
        updateEmployeeDto,
        { new: true },
      );
    } catch (error) {
      this.logger.error('error while update employee', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async listEmployees(): Promise<Employee[]> {
    //get all employee
    try {
      this.logger.log('getting employees');
      return await this.employeeModel.find().exec();
    } catch (error) {
      this.logger.error('error while getting employee', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteEmployee(employeeId: string) {
    //delete employee
    try {
      this.logger.log('deleting employee');
      return this.employeeModel.deleteOne({ _id: employeeId });
    } catch (error) {
      this.logger.error('error while deleting employee', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
