import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty()
  amount: number;
}
