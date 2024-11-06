import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from './api/auth/auth.module';
import { ExerciseModule } from './api/exercise/exercise.module';
import { StripeModule } from './api/stripe/stripe.module';
import { UserModule } from './api/user/user.module';
import { WorkoutModule } from './api/workout/workout.module';

import { ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['**/*.entity.js']
};

@Module({
  imports: [TypeOrmModule.forRoot(options), AuthModule, UserModule, StripeModule, WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
