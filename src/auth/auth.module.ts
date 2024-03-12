import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UsersService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
