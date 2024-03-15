import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  itemsId: number[];
}
