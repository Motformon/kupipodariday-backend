import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsService } from './wishlists.service';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private wishlistsService: WishlistsService,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wishlist> {
    return this.wishlistsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() wishlist: CreateWishlistDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const wishes = await this.wishesService.findByIds(wishlist.itemsId || []);

    return this.wishlistsService.create(wishlist, findUser, wishes);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() wishlist: UpdateWishlistDto,
  ) {
    const findWishlist = await this.wishlistsService.findById(id);
    if (!findWishlist) {
      throw new NotFoundException('Список подарков не найден!');
    }
    const userId = req?.user?.sub;
    if (Number(userId) !== Number(findWishlist?.owner?.id)) {
      throw new ForbiddenException('Нет прав!');
    }

    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const wishes = await this.wishesService.findByIds(wishlist.itemsId || []);
    await this.wishlistsService.updateById(id, wishlist, findUser, wishes);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const wishlist = await this.wishlistsService.findById(id);
    if (!wishlist) {
      throw new NotFoundException('Список подарков не найден!');
    }
    const userId = req?.user?.sub;
    if (Number(userId) !== Number(wishlist?.owner?.id)) {
      throw new ForbiddenException('Нет прав!');
    }
    await this.wishlistsService.removeById(id);
  }
}
