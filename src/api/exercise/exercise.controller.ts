import { Controller, Post, Body, Req, UseGuards, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ExerciseService } from './exercise.service';

import { MinRole } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { ROLE } from '../../common/consts';

@Controller('api/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getExercises(@Req() req, @Query() query): Promise<any> {
    return await this.exerciseService.getExercises(req.user.id, query);
  }

  @Get('muscle-group')
  async getMuscleGroups(): Promise<any> {
    return await this.exerciseService.getMuscleGroups();
  }

  @Get('equipment')
  async getEquipment(): Promise<any> {
    return await this.exerciseService.getEquipment();
  }
}
