import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

import { Workout } from '../../common/entities/workout.entity';
import { WorkoutExercise } from '../../common/entities/workout-exercise.entity';

require('dotenv').config();

@Module({
  controllers: [WorkoutController],
  imports: [
    TypeOrmModule.forFeature([WorkoutExercise, Workout]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' }
    })
  ],
  providers: [WorkoutService],
  exports: [WorkoutService]
})
export class WorkoutModule {}
