import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

import { ResetPasswordToken } from '../../common/entities/reset-password-token.entity';
import { UserRefreshToken } from '../../common/entities/user-refresh-token.entity';
import { User } from '../../common/entities/user.entity';

require('dotenv').config();

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([ResetPasswordToken, User, UserRefreshToken]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
