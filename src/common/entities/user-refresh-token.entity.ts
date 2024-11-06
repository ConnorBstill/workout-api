import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('user_refresh_token')
export class UserRefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id'
  })
  userId: number;

  @Column({
    name: 'token',
    length: 255
  })
  token: string;

  @CreateDateColumn({
    name: 'date_created'
  })
  dateCreated: string;

  @Column({
    name: 'date_expires'
  })
  dateExpires: string;
}
