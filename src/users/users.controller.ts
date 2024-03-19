import {
  Body,
  Controller,
  Get,
  Patch,
  NotFoundException,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateMeDto } from './dto/update-me.dto';
import { Wish } from '../wishes/entities/wish.entity';
import { hashSync } from 'bcrypt';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  findMe(@Request() req): Promise<User> {
    const userId = req?.user?.sub;
    return this.usersService.findMe(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/me/wishes')
  async findMeWishes(@Request() req) {
    const userId = req?.user?.sub;
    const user = await this.usersService.findUserWishes(userId);
    return user?.wishes || [];
  }

  @UseGuards(AuthGuard)
  @Patch('/me')
  async updateMe(@Request() req, @Body() user: UpdateMeDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const hash = hashSync(user.password, 10);

    await this.usersService.updateById(userId, { ...user, password: hash });
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const findUser = await this.usersService.findByUsername(username);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return findUser;
  }

  @UseGuards(AuthGuard)
  @Get(':username/wishes')
  async findByUsernameWishes(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    const findUser = await this.usersService.findByUsernameWishes(username);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return findUser.wishes;
  }

  @UseGuards(AuthGuard)
  @Post('find')
  findUsers(@Body() body: { query: string }) {
    return this.usersService.findUsers(body.query);
  }
}
