import { Controller, Post, Body, Put, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authenticateUser(@Body() body): Promise<any> {
    return await this.authService.validateUser(body.email, body.password);
  }

  @Post('register')
  async registerUser(@Body() body): Promise<Response> {
    return await this.authService.registerUser(body);
  }

  @Post('refresh')
  async validateUserWithRefreshToken(@Body() body): Promise<Response> {
    return await this.authService.validateUserWithRefreshToken(body.refreshToken);
  }

  @Post('reset-password/request')
  async requestResetPassword(@Body() body): Promise<Response> {
    return await this.authService.requestResetPassword(body);
  }

  @Put('reset-password/confirm')
  async confirmResetPassword(@Body() body): Promise<Response> {
    return await this.authService.confirmResetPassword(body);
  }
}
