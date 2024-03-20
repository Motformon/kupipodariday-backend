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
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';
import { UsersService } from '../users/users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Get('/top')
  findTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }

  @Public()
  @Get('/last')
  findLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wish> {
    return this.wishesService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() wish: CreateWishDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return this.wishesService.create(wish, findUser);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateById(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() wish: UpdateWishDto,
  ) {
    const findWish = await this.wishesService.findById(id);
    if (!findWish) {
      throw new NotFoundException('Подарок не найден!');
    }
    if (wish.price !== findWish.price && findWish.offers.length > 0) {
      throw new ForbiddenException(
        'Нельзя изменять стоимость подарка, если уже есть желающие скинуться!',
      );
    }
    const userId = req?.user?.sub;
    if (Number(userId) !== Number(findWish?.owner?.id)) {
      throw new ForbiddenException('Нет прав!');
    }

    await this.wishesService.updateById(id, wish);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const wish = await this.wishesService.findById(id);
    if (!wish) {
      throw new NotFoundException('Подарок не найден!');
    }
    const userId = req?.user?.sub;
    if (Number(userId) !== Number(userId?.owner?.id)) {
      throw new ForbiddenException('Нет прав!');
    }
    await this.wishesService.removeById(id);
  }
}
