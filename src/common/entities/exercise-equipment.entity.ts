import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

import { UserRole } from '../types';

@Entity('exercise_equipment')
export class ExerciseEquipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'label'
  })
  label: string;
}
