import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('user_group')
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id'
  })
  userId: number;

  @Column({
    name: 'group_id'
  })
  groupId: number;

  @Column({
    name: 'date_entered'
  })
  dateEntered: string;
}
