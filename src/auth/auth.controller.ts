import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { compareHashPassword } from './helpers';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.usersService.findAuth(signInDto.username);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const matched = await compareHashPassword(
      signInDto.password,
      user?.password,
    );
    if (!matched) {
      throw new UnauthorizedException('Некорректная пара логин и пароль');
    }

    return this.authService.signIn(signInDto, user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return hash(signUpDto.password, 10).then((hash) => {
      return this.authService
        .signUp({ ...signUpDto, password: hash })
        .catch((error) => {
          if (error instanceof QueryFailedError) {
            const err = error.driverError;
            if (err.code === '23505') {
              throw new ConflictException(
                'Пользователь с таким email или username уже зарегистрирован',
              );
            }
          }
        });
    });
  }
}
