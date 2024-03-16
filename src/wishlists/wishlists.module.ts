import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { Wish } from '../wishes/entities/wish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Wish]),
  ],
  providers: [WishlistsService, UsersService, WishesService],
  controllers: [WishlistsController],
})
export class WishlistsModule {}
