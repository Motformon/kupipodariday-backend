import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishlistDto {
  @ApiProperty()
  name: string;
}
