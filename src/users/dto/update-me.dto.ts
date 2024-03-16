import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, Length, IsOptional } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  @Length(2, 30, {
    message: 'Длина текста имя пользователя должна быть от 2 до 30 символов!',
  })
  username: string;

  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  @IsOptional()
  @Length(2, 30, {
    message: 'Длина текста о себе должна быть от 2 до 200 символов!',
  })
  about: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  avatar: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Ошибка валидации переданных значений' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  password: string;
}
