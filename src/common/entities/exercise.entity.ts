import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

import { UserRole } from '../types';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'muscle_group_id'
  })
  muscleGroupId: number;

  @Column({
    name: 'equipment_id'
  })
  equipmentId: number;
}
