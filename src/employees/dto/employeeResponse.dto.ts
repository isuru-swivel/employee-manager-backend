import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../types';

export class EmployeeResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  number: string;

  @ApiProperty({
    enum: [Gender.F, Gender.M],
  })
  gender: string;

  @ApiProperty()
  photo: string;
}
