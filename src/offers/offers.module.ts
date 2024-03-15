import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Wish } from '../wishes/wish.entity';
import { WishesService } from '../wishes/wishes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Wish]),
  ],
  providers: [OffersService, UsersService, WishesService],
  controllers: [OffersController],
})
export class OffersModule {}
