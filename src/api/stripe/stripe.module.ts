import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

import { User } from '../../common/entities/user.entity';

require('dotenv').config();

@Module({
  controllers: [StripeController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' }
    })
  ],
  providers: [StripeService],
  exports: [StripeService]
})
export class StripeModule {}
