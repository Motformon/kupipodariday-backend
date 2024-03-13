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
  Request,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './wishlist.entity';
import { WishlistsService } from './wishlists.service';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private wishlistsService: WishlistsService,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistsService.findById(id);
    const wishes = await this.wishesService.findByIds(wishlist.items || []);
    return {
      ...wishlist,
      items: wishes as any,
    };
  }

  @Post()
  async create(@Request() req, @Body() wishlist: CreateWishlistDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return this.wishlistsService.create(wishlist, findUser);
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
