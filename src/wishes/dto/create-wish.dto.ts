import { ApiProperty } from '@nestjs/swagger';

export class CreateWishDto {
  @ApiProperty()
  name: string;
}
