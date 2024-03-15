import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  @IsNumber()
  itemId: number;
}
