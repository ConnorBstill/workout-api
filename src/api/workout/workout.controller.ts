import { Controller, Post, Body, Req, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { WorkoutService } from './workout.service';

import { MinRole } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { ROLE } from '../../common/consts';

@Controller('api/workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getWorkouts(@Req() req): Promise<any> {
    return await this.workoutService.getWorkouts(req.user.id);
  }

  @Get(':id')
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getWorkoutById(@Req() req, @Param() param): Promise<any> {
    return await this.workoutService.getWorkoutById(req.user.id, param.id);
  }

  @Post()
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createWorkout(@Req() req, @Body() body): Promise<any> {
    return await this.workoutService.createWorkout(req.user.id, body);
  }

  @Delete(':id')
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteWorkoutById(@Req() req, @Param() param): Promise<any> {
    return await this.workoutService.deleteWorkoutById(req.user.id, param.id);
  }

  @Get(':id/exercise')
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getWorkoutExercises(@Req() req, @Param() param): Promise<any> {
    return await this.workoutService.getWorkoutExercises(req.user.id, param.id);
  }

  @Post(':id/exercise')
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async setWorkoutExercises(@Req() req, @Param() param, @Body() body): Promise<any> {
    return await this.workoutService.setWorkoutExercises(req.user.id, param.id, body);
  }
}
