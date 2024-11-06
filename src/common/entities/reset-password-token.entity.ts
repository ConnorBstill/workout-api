import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reset_password_token')
export class ResetPasswordToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column({
    name: 'used_flag'
  })
  usedFlag: boolean;

  @Column({
    name: 'request_date'
  })
  requestDate: string;

  @Column({
    name: 'expire_date'
  })
  expireDate: string;

  @Column({
    name: 'used_date'
  })
  usedDate: string;
}
