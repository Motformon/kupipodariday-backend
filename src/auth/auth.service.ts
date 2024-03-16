import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findAuth(signInDto.username);
    return compare(signInDto.password, user?.password).then(async (matched) => {
      if (!matched) {
        throw new UnauthorizedException('Некорректная пара логин и пароль');
      }
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    });
  }

  async signUp(signUpDto: SignUpDto) {
    return this.usersService.create(signUpDto);
  }
}
