import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
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
