import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './wish.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), TypeOrmModule.forFeature([User])],
  providers: [WishesService, UsersService],
  controllers: [WishesController],
})
export class WishesModule {}
