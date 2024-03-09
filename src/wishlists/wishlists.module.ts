import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistsService],
  controllers: [WishlistsController],
})
export class WishlistsModule {}
