import { Controller, Post, Body, Req, UseGuards, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StripeService } from './stripe.service';

import { MinRole } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { ROLE } from '../../common/consts';

@Controller('api/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // @Get('client-token')
  // async getClientToken(): Promise<any> {
  //   return await this.stripeService.getStripePublicToken();
  // }

  // @Get('customer')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async getCustomerRef(@Req() req): Promise<any> {
  //   return await this.stripeService.getCustomerRef(req.user.organizationId);
  // }

  // @Get('subscription')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async getOrganizationSubscription(@Req() req): Promise<any> {
  //   return await this.stripeService.getOrganizationSubscription(req.user.organizationId);
  // }

  // @Put('subscription')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async updateSubscription(@Req() req, @Body() body): Promise<any> {
  //   return await this.stripeService.updateSubscription(req.user.organizationId, body);
  // }

  // @Put('card')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async updateCustomerCard(@Req() req, @Body() body): Promise<any> {
  //   return await this.stripeService.updateCustomerCard(req.user.organizationId, body.token);
  // }
}
