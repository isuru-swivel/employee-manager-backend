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
import { Gender } from '../../types/index';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsAlpha()
  @Length(6, 10)
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  @Length(6, 10)
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @ApiProperty({
    required: false,
  })
  email: string;

  @IsPhoneNumber('LK')
  @ApiProperty({
    required: false,
  })
  number: string;

  @IsEnum(Gender)
  @ApiProperty({
    required: false,
    enum: [Gender.F, Gender.M],
  })
  gender: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  photo: string;
}
