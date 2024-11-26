import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('workout_exercise')
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'workout_id'
  })
  workoutId: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'weight'
  })
  weight: string;

  @Column({
    name: 'reps_per_set'
  })
  repsPerSet: number;

  @Column({
    name: 'sets'
  })
  sets: number;

  @Column({
    name: 'rest_time'
  })
  restTime: number;

  @Column({
    name: 'rest_time_unit'
  })
  restTimeUnit: 's' | 'm';

  @Column({
    name: 'date_entered'
  })
  dateEntered: string;
}
