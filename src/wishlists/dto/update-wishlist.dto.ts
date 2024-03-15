import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UpdateWishlistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  itemsId: number[];
}
