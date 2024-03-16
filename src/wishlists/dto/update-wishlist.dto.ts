import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class UpdateWishlistDto {
  @ApiProperty()
  @IsString({ message: 'Ошибка валидации переданных значений' })
  name: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  image: string;

  @ApiProperty()
  itemsId: number[];
}
