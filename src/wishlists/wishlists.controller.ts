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
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './wishlist.entity';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.findById(id);
  }

  @Post()
  create(@Body() wishlist: CreateWishlistDto) {
    return this.wishlistsService.create(wishlist);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() wishlist: UpdateWishlistDto,
  ) {
    const findWishlist = await this.wishlistsService.findById(id);
    if (!findWishlist) {
      throw new NotFoundException();
    }
    await this.wishlistsService.updateById(id, wishlist);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const wishlist = await this.wishlistsService.findById(id);
    if (!wishlist) {
      throw new NotFoundException();
    }
    await this.wishlistsService.removeById(id);
  }
}
