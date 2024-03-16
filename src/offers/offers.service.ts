import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  findById(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        item: true,
      },
    });
  }

  create(
    createOfferDto: CreateOfferDto,
    user: User,
    wish: Wish,
  ): Promise<Offer> {
    return this.offerRepository.save({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      item: wish,
      user,
    });
  }
}
