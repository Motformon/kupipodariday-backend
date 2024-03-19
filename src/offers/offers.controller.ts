import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('offers')
export class OffersController {
  constructor(
    private offersService: OffersService,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() offer: CreateOfferDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const findWish = await this.wishesService.findById(offer.itemId);
    if (!findWish) {
      throw new NotFoundException('Подарок не найден!');
    }

    const amount = offer.amount;

    await this.wishesService.updateRaisedById(findWish, amount, userId);

    return this.offersService.create(offer, findUser, findWish);
  }
}
