import { Connection } from 'mongoose';
import { EmployeeSchema } from '../schemas/employees.schema';

export const employeesProviders = [
  {
    provide: 'EMPLOYEE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Employee', EmployeeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
