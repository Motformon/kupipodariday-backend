import {
  Body,
  Controller,
  Get,
  Patch,
  NotFoundException,
  Param,
  Request,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateMeDto } from './dto/update-me.dto';
import {Wish} from "../wishes/wish.entity";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/me')
  findMe(@Request() req): Promise<User> {
    const userId = req?.user?.sub;
    return this.usersService.findById(userId);
  }

  @Get('/me/wishes')
  async findMeWishes(@Request() req) {
    const userId = req?.user?.sub;
    const user = await this.usersService.findUserWishes(userId);
    return user?.wishes || [];
  }

  @Patch('/me')
  async updateMe(@Request() req, @Body() user: UpdateMeDto) {
    const userId = req?.user?.sub;
    const findUser = await this.usersService.findById(userId);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    await this.usersService.updateById(userId, user);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const findUser = await this.usersService.findByUsername(username);
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден!');
    }
    return findUser;
  }

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

  @Post('find')
  findUsers(@Body() body: { query: string }) {
    return this.usersService.findUsers(body.query);
  }
}
