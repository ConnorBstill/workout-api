import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponseBuilder, ResponseBuilderData } from '../../common/ResponseBuilder';

import { createMySqlDateEntered } from '../../common/utils/common';

import { ExerciseEquipment } from '../../common/entities/exercise-equipment.entity';
import { ExerciseMuscleGroup } from '../../common/entities/exercise-muscle-group.entity';
import { Exercise } from '../../common/entities/exercise.entity';

import { Like, Repository } from 'typeorm';

interface GetExercisesSearchOpts {
  query?: string;
  muscleGroupId?: number;
  equipmentId?: number;
}

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseEquipment)
    private readonly exerciseEquipmentRepository: Repository<ExerciseEquipment>,

    @InjectRepository(ExerciseMuscleGroup)
    private readonly exerciseMuscleGroupRepository: Repository<ExerciseMuscleGroup>
  ) {}
  z;

  async getExercises(refUserId: number, searchOpts: GetExercisesSearchOpts): Promise<ResponseBuilderData<any>> {
    try {
      const whereClause: any = {};

      if (searchOpts.query) {
        whereClause.name = Like('%' + searchOpts.query + '%');
      }

      if (searchOpts.muscleGroupId) {
        whereClause.muscleGroupId = searchOpts.muscleGroupId;
      }

      if (searchOpts.equipmentId) {
        whereClause.equipmentId = searchOpts.equipmentId;
      }

      const exercises: any[] = await this.exerciseRepository.find({
        where: whereClause
      });

      for (let i = 0; i < exercises.length; i++) {
        const item = exercises[i];

        const muscleGroup = await this.exerciseMuscleGroupRepository.findOne({
          where: {
            id: item.muscleGroupId
          }
        });

        const equipment = await this.exerciseEquipmentRepository.findOne({
          where: {
            id: item.equipmentId
          }
        });

        item.equipment = equipment;
        item.muscleGroup = muscleGroup;

        delete item.equipmentId;
        delete item.muscleGroupId;
      }

      return ResponseBuilder(exercises);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }
}
