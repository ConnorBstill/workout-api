import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { EmailService } from '../../common/EmailService';
import { ResponseBuilder, ResponseBuilderData } from '../../common/ResponseBuilder';

import { ResetPasswordToken } from '../../common/entities/reset-password-token.entity';
import { User } from '../../common/entities/user.entity';
import { UserRefreshToken } from '../../common/entities/user-refresh-token.entity';

import { sendEmail } from '../../common/utils/sendgrid.utils';

import { CREATE_HMAC_ALG, SQL_DATETIME_FORMAT } from '../../common/consts';

import * as moment from 'moment';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { createMySqlDateEntered, generateRandomString } from '../../common/utils/common';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(ResetPasswordToken)
    private readonly resetPasswordTokenRepository: Repository<ResetPasswordToken>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserRefreshToken)
    private readonly userRefreshTokenRepository: Repository<UserRefreshToken>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (!email || !password) {
      return ResponseBuilder(null, 'Invalid payload', true);
    }

    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return ResponseBuilder(null, 'User not found', true);
    }

    const hashedPassword = createHmac('sha256', password).digest('hex');

    if (user && user.password === hashedPassword) {
      const { jwt } = await this.login(user);

      const refreshToken = generateRandomString();

      await this.userRefreshTokenRepository
        .createQueryBuilder()
        .insert()
        .into(UserRefreshToken)
        .values([
          {
            userId: user.id,
            token: refreshToken,
            dateCreated: moment().format(SQL_DATETIME_FORMAT),
            dateExpires: moment()
              .add(90, 'days')
              .format(SQL_DATETIME_FORMAT)
          }
        ])
        .execute();

      return ResponseBuilder({ jwt, refreshToken }, null, false);
    }

    return ResponseBuilder(null, 'User not found', true);
  }

  async validateUserWithRefreshToken(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      return ResponseBuilder(null, 'Invalid payload', true);
    }

    const tokenRecord = await this.userRefreshTokenRepository
      .createQueryBuilder()
      .select()
      .where(
        `
      token = :refreshToken AND date_expires < ADDDATE(NOW(), INTERVAL 90 DAY)
    `,
        {
          refreshToken
        }
      )
      .getOne();

    if (tokenRecord) {
      const user = await this.userRepository.findOne({
        where: {
          id: tokenRecord.userId
        }
      });

      if (user) {
        await this.userRefreshTokenRepository
          .createQueryBuilder()
          .delete()
          .where('user_id = :userId', {
            userId: user.id
          })
          .execute();

        const { jwt } = await this.login(user);

        const refreshToken = generateRandomString();

        await this.userRefreshTokenRepository
          .createQueryBuilder()
          .insert()
          .into(UserRefreshToken)
          .values([
            {
              userId: user.id,
              token: refreshToken,
              dateCreated: moment().format(SQL_DATETIME_FORMAT),
              dateExpires: moment()
                .add(90, 'days')
                .format(SQL_DATETIME_FORMAT)
            }
          ])
          .execute();

        return ResponseBuilder(
          {
            jwt,
            refreshToken
          },
          null,
          false
        );
      }
    }

    return ResponseBuilder(null, 'User not found', true);
  }

  async login(user: User) {
    const payload = {
      id: user.id
    };

    return {
      jwt: this.jwtService.sign(payload)
    };
  }

  async requestResetPassword(payload): Promise<any> {
    try {
      const { email } = payload;

      const userRecord = await this.userRepository.findOne({
        where: {
          email
        }
      });

      if (!userRecord) {
        return ResponseBuilder(null, 'Account not found', true);
      }

      const insert = await this.resetPasswordTokenRepository
        .createQueryBuilder()
        .insert()
        .into(ResetPasswordToken)
        .values([
          {
            email: email,
            requestDate: moment().format(SQL_DATETIME_FORMAT),
            expireDate: moment()
              .add('1', 'days')
              .format(SQL_DATETIME_FORMAT)
          }
        ])
        .execute();

      const token = uuidv4();
      const link = `${process.env.URL}/reset-password-confirmation/?email=${encodeURIComponent(email)}&token=${token}`;

      const hashedToken = createHmac('sha256', token).digest('hex');

      await this.resetPasswordTokenRepository
        .createQueryBuilder()
        .update()
        .set({
          token: hashedToken
        })
        .where({
          id: insert.raw.insertId
        })
        .execute();

      await EmailService.sendResetPasswordEmail({
        email: email,
        link: link
      });

      return ResponseBuilder(null, 'Sent password reset link', false);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async confirmResetPassword(payload): Promise<any> {
    try {
      if (!payload.email) {
        return ResponseBuilder(null, 'Invalid email', true);
      }

      const passwordResetRecord = await this.resetPasswordTokenRepository.findOne({
        where: {
          email: decodeURIComponent(payload.email)
        },
        order: {
          requestDate: 'DESC'
        }
      });

      // const tokensMatch = await bCryptCompare(passwordResetRecord.token, payload.token);

      // if (!tokensMatch) {
      //   return ResponseBuilder(null, 'An error ocurred.', true);
      // }

      // const nowDate = moment();
      // const expireDate = moment(passwordResetRecord.expireDate);

      // if (passwordResetRecord.usedFlag || nowDate > expireDate) {
      //   return ResponseBuilder(null, 'This link has expired.', true);
      // }

      // const newHashedPassword = await bCryptHash(payload.password);

      // await this.userRepository
      //   .createQueryBuilder()
      //   .update()
      //   .set({
      //     password: newHashedPassword
      //   })
      //   .where({
      //     email: payload.email
      //   })
      //   .execute();

      await this.resetPasswordTokenRepository
        .createQueryBuilder()
        .update()
        .set({
          usedFlag: true,
          usedDate: moment().format(SQL_DATETIME_FORMAT)
        })
        .where({
          id: passwordResetRecord.id
        });

      const user = await this.userRepository.findOne({
        where: {
          email: passwordResetRecord.email
        }
      });

      const emailBody = `
        <p>Your password has been successfully reset.</p>
      `;

      await EmailService.sendEmail(user.email, 'Your password has been reset', emailBody);

      return ResponseBuilder(null, 'Password reset successful');
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async registerUser(payload: any): Promise<any> {
    try {
      const userRecord = await this.userRepository.findOne({
        where: {
          email: payload.email
        }
      });

      if (userRecord && userRecord.id) {
        return ResponseBuilder(null, 'Email already registered', true);
      }

      const hashedPassword = createHmac(CREATE_HMAC_ALG, payload.password).digest('hex');

      const newUserRecord = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: payload.email,
          password: hashedPassword
        })
        .execute();

      const { jwt } = await this.login(payload);

      const refreshToken = generateRandomString();

      await this.userRefreshTokenRepository
        .createQueryBuilder()
        .insert()
        .into(UserRefreshToken)
        .values([
          {
            userId: newUserRecord.raw.insertId,
            token: refreshToken,
            dateCreated: moment().format(SQL_DATETIME_FORMAT),
            dateExpires: moment()
              .add(90, 'days')
              .format(SQL_DATETIME_FORMAT)
          }
        ])
        .execute();

      return ResponseBuilder({ jwt, refreshToken });
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }
}
