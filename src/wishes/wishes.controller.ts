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
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';
import { UsersService } from '../users/users.service';

@Controller('wishes')
export class WishesController {
  constructor(
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}

  @Get('/top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }

  @Get('/last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findById(id);
  }

  @Post()
  async create(@Request() req, @Body() wish: CreateWishDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return this.wishesService.create(wish, findUser);
  }

  @Post(':id/copy')
  async copy(@Request() req, @Param('id', ParseIntPipe) idWish: number) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const findWish = await this.wishesService.findById(idWish);
    if (!findWish) {
      throw new NotFoundException('Подарок не найден!');
    }

    await this.wishesService.updateCopy(idWish, findWish.copied + 1);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...createWish } = findWish;

    return this.wishesService.createCopy({
      ...(createWish as Wish),
      owner: findUser,
      copied: createWish.copied + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() wish: UpdateWishDto,
  ) {
    const findWish = await this.wishesService.findById(id);
    if (!findWish) {
      throw new NotFoundException('Подарок не найден!');
    }
    await this.wishesService.updateById(id, wish);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const wish = await this.wishesService.findById(id);
    if (!wish) {
      throw new NotFoundException('Подарок не найден!');
    }
    await this.wishesService.removeById(id);
  }
}
