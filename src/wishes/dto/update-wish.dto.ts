import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishDto {
  @ApiProperty()
  name: string;
}
