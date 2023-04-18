import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { SortTypes } from '../types';
import { LoggerModule } from 'nestjs-pino';
import { employeesProviders } from './employees.providers';

describe('EmployeeController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        ...employeesProviders,
        {
          provide: 'EMPLOYEE_MODEL',
          useValue: {
            listEmployees: jest.fn(),
            addEmployee: jest.fn(),
            updateEmployee: jest.fn(),
            deleteEmployee: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  describe('addEmployee', () => {
    it('should add an employee', async () => {
      const employee: any = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        number: '555-5555',
        gender: 'male',
        photo: 'https://example.com/john.jpg',
      };
      jest.spyOn(service, 'addEmployee').mockReturnValue(employee);
      const result = await controller.addEmployee(employee);
      expect(result).toEqual(employee);
    });
  });

  describe('getEmployee', () => {
    it('should return a list of employees', async () => {
      const employees: any = [
        {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          number: '555-5555',
          gender: 'male',
          photo: 'https://example.com/john.jpg',
        },
        {
          id: '2',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          number: '555-1234',
          gender: 'female',
          photo: 'https://example.com/jane.jpg',
        },
      ];
      jest.spyOn(service, 'listEmployees').mockReturnValue(employees);
      const result = await controller.getEmployees('first_name', SortTypes.asc);
      expect(result).toEqual(employees);
    });
  });
});
