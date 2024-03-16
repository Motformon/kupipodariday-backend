import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishDto {
  @ApiProperty()
  @Length(1, 250, {
    message: 'Длина названия должна быть от 1 до 250 символов!',
  })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  name: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  link: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @Length(1, 1024, {
    message: 'Длина текста описания должна быть от 1 до 1024 символов!',
  })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  description: string;
}
