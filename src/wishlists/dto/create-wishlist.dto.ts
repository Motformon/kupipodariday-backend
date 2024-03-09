import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
  @ApiProperty()
  name: string;
}
