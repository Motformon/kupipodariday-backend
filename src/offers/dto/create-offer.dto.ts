import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Ошибка валидации переданных значений' })
  amount: number;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  @IsNumber({}, { message: 'Ошибка валидации переданных значений' })
  itemId: number;
}
