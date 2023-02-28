import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
  IsAlpha,
} from 'class-validator';

enum Gender {
  M = 'M',
  F = 'F',
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsAlpha()
  @Length(6, 10)
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  @Length(6, 10)
  last_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('LK')
  number: string;

  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @IsString()
  photo: string;
}
