import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponseBuilder, ResponseBuilderData } from '../../common/ResponseBuilder';

import { User } from '../../common/entities/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUser(organizationId: number, userId: number): Promise<ResponseBuilderData<any>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId
        }
      });

      return ResponseBuilder(user);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async getProviders(organizationId: number): Promise<ResponseBuilderData<any>> {
    try {
      const providers = await this.userRepository.find({
        where: {
          organizationId,
          role: 'doctor'
        }
      });

      return ResponseBuilder(providers, null);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async getProviderById(id: number): Promise<ResponseBuilderData<any>> {
    try {
      const provider = await this.userRepository.findOne({
        where: {
          id,
          role: 'doctor'
        }
      });

      return ResponseBuilder(provider, null);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async getRefUser(userId: number): Promise<ResponseBuilderData<any>> {
    try {
      const user = await this.userRepository.findOne({
        id: userId
      });

      return ResponseBuilder(user, null);
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }

  async saveRefUser(userId: number, payload: Partial<User>): Promise<ResponseBuilderData<any>> {
    try {
      const emailRecord = await this.userRepository.findOne({
        where: {
          email: payload.email
        }
      });

      if (emailRecord && emailRecord.id !== userId) {
        return ResponseBuilder(null, 'Email already in use', true);
      }

      // if (payload.password) {
      //   const password = await bCryptHash(payload.password);

      //   this.userRepository
      //     .createQueryBuilder()
      //     .update()
      //     .set({
      //       name: payload.name,
      //       phoneNumber: payload.phoneNumber
      //     })
      //     .where({
      //       id: userId
      //     })
      //     .execute();
      // } else {
      this.userRepository
        .createQueryBuilder()
        .update()
        .set({
          name: payload.name,
          email: payload.email,
          phoneNumber: payload.phoneNumber
        })
        .where({
          id: userId
        })
        .execute();
      // }

      return ResponseBuilder(null, 'Updated account');
    } catch (err) {
      return ResponseBuilder(null, null, true, {
        error: err,
        log: true
      });
    }
  }
}
