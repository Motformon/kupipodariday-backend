import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wish]),
    TypeOrmModule.forFeature([User]),
    JwtModule,
  ],
  providers: [WishesService, UsersService],
  controllers: [WishesController],
})
export class WishesModule {}
