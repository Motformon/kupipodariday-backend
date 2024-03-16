import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  username: string;

  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  password: string;
}
