import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './wish.entity';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findById(id);
  }

  @Post()
  create(@Body() wish: CreateWishDto) {
    return this.wishesService.create(wish);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() wish: UpdateWishDto,
  ) {
    const findWish = await this.wishesService.findById(id);
    if (!findWish) {
      throw new NotFoundException();
    }
    await this.wishesService.updateById(id, wish);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const wish = await this.wishesService.findById(id);
    if (!wish) {
      throw new NotFoundException();
    }
    await this.wishesService.removeById(id);
  }
}
