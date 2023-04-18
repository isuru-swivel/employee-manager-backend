import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { employeesProviders } from './employees.providers';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [DatabaseModule, LoggerModule.forRoot()],
  controllers: [EmployeesController],
  providers: [EmployeesService, ...employeesProviders],
})
export class EmployeesModule {}
