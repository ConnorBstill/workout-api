import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('workout')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id'
  })
  userId: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'scheduled_date'
  })
  scheduledDate: string;

  @Column({
    name: 'deleted_flag'
  })
  deletedFlag: boolean;

  @Column({
    name: 'date_entered'
  })
  dateEntered: string;
}
