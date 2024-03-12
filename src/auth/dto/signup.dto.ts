import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, Length, IsOptional } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @Length(2, 30, {
    message: 'Длина текста имя пользователя должна быть от 2 до 30 символов!',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(2, 30, {
    message: 'Длина текста о себе должна быть от 2 до 200 символов!',
  })
  about: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  avatar: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
