import { Controller, Post, Body, Req, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

import { MinRole } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { ROLE } from '../../common/consts';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getRefUser(@Req() req): Promise<any> {
    return await this.userService.getRefUser(req.user.id);
  }

  @Get(':id')
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUser(@Req() req, @Param() param): Promise<any> {
    return await this.userService.getUser(req.user.organizationId, param.id);
  }

  @Put()
  // @MinRole(ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async saveRefUser(@Req() req, @Body() body): Promise<any> {
    return await this.userService.saveRefUser(req.user.id, body);
  }
}
