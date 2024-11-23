import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'email'
  })
  email: string;

  @Column({
    name: 'password'
  })
  password: string;

  @Column({
    name: 'phone_number'
  })
  phoneNumber: string;

  @Column({
    name: 'admin_flag'
  })
  adminFlag: boolean;

  @Column({
    name: 'date_entered'
  })
  dateEntered: string;
}
