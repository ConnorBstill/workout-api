import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('exercise_muscle_group')
export class ExerciseMuscleGroup {
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
