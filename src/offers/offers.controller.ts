import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';

@Controller('offers')
export class OffersController {
  constructor(
    private offersService: OffersService,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findById(id);
  }

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
    const raised = findWish.raised;
    const price = findWish.price;

    if (amount + raised > price) {
      throw new ForbiddenException(
        `Сумма собранных средств не может превышать стоимость подарка! Можно скинуть не больше ${
          price - raised
        }`,
      );
    } else if (price === raised) {
      throw new ForbiddenException(
        'Нельзя скинуться на подарки, на которые уже собраны деньги!',
      );
    } else if (userId === findWish.owner.id) {
      throw new ForbiddenException(
        'Нельзя вносить деньги на собственные подарки!',
      );
    }

    await this.wishesService.updateRaisedById(findWish.id, raised + amount);

    return this.offersService.create(offer, findUser, findWish);
  }
}
