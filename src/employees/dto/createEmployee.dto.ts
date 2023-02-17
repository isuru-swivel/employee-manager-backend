import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

enum Gender {
  M = 'M',
  F = 'F',
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 10)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 10)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  number: string;

  @IsString()
  gender: Gender;

  @IsString()
  photo: string;
}
