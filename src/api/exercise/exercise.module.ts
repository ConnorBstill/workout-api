import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

import { Exercise } from '../../common/entities/exercise.entity';
import { ExerciseEquipment } from '../../common/entities/exercise-equipment.entity';
import { ExerciseMuscleGroup } from '../../common/entities/exercise-muscle-group.entity';

require('dotenv').config();

@Module({
  controllers: [ExerciseController],
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseEquipment, ExerciseMuscleGroup]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' }
    })
  ],
  providers: [ExerciseService],
  exports: [ExerciseService]
})
export class ExerciseModule {}
