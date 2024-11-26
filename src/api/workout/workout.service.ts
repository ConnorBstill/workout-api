import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponseBuilder, ResponseBuilderData } from '../../common/ResponseBuilder';

import { Workout } from '../../common/entities/workout.entity';
import { WorkoutExercise } from '../../common/entities/workout-exercise.entity';

import { Repository } from 'typeorm';
import { createMySqlDateEntered } from '../../common/utils/common';

import { Exercise } from '../../common/types/workout.types'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,

    @InjectRepository(WorkoutExercise)
    private readonly workoutExerciseRepository: Repository<WorkoutExercise>
  ) {}

  async getWorkouts(refUserId: number): Promise<ResponseBuilderData<any>> {
    try {
      const workouts = await this.workoutRepository.find({
        select: ['id', 'name', 'scheduledDate'],
        where: {
          userId: refUserId,
          deletedFlag: false
        }
      });

      return ResponseBuilder(workouts);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async getWorkoutById(refUserId: number, workoutId: number): Promise<ResponseBuilderData<any>> {
    try {
      const workout = await this.workoutRepository.findOne({
        select: ['id', 'name', 'scheduledDate'],
        where: {
          id: workoutId,
          userId: refUserId
        }
      });

      return ResponseBuilder(workout);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async createWorkout(refUserId: number, payload: any): Promise<ResponseBuilderData<any>> {
    try {
      const newWorkout = await this.workoutRepository
        .createQueryBuilder()
        .insert()
        .into(Workout)
        .values([
          {
            userId: refUserId,
            name: payload.name,
            scheduledDate: payload.scheduledDate,
            dateEntered: createMySqlDateEntered()
          }
        ])
        .execute();

      return ResponseBuilder({
        newWorkoutId: newWorkout.raw.insertId
      });
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async deleteWorkoutById(refUserId: number, workoutId: number): Promise<ResponseBuilderData<any>> {
    try {
      await this.workoutRepository
        .createQueryBuilder()
        .update()
        .set({
          deletedFlag: true
        })
        .where({
          id: workoutId,
          userId: refUserId
        })
        .execute();

      return ResponseBuilder(null);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async getWorkoutExercises(refUserId: number, workoutId: number): Promise<ResponseBuilderData<any>> {
    try {
      const exercises = await this.workoutExerciseRepository.find({
        where: {
          workoutId
        }
      });

      return ResponseBuilder(exercises);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async setWorkoutExercises(refUserId: number, workoutId: number, payload: Exercise[]): Promise<ResponseBuilderData<any>> {
    try {
      await this.workoutExerciseRepository
        .createQueryBuilder()
        .delete()
        .where({
          workoutId
        })
        .execute();

      for (let i = 0; i < payload.length; i++) {
        const { name, weight, repsPerSet, sets, restTime, restTimeUnit } = payload[i];

        await this.workoutExerciseRepository
          .createQueryBuilder()
          .insert()
          .into(WorkoutExercise)
          .values([
            {
              workoutId,
              name,
              weight,
              repsPerSet,
              sets,
              restTime,
              restTimeUnit,
              dateEntered: createMySqlDateEntered()
            }
          ])
          .execute();
      }

      return ResponseBuilder(null);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }
}
