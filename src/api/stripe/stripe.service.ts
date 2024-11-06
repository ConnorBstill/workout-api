import { InjectRepository } from '@nestjs/typeorm';

import { ResponseBuilder, ResponseBuilderData } from '../../common/ResponseBuilder';

import Stripe from 'stripe';
import { Repository } from 'typeorm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: '2020-08-27'
});

export class StripeService {
  constructor() {}

  // async createCustomer(): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const customer = await stripe.customers.create();

  //     return ResponseBuilder(customer, 'Created Stripe customer', false);
  //   } catch (err) {
  //     return ResponseBuilder(null, 'Could not create Stripe customer', true, {
  //       log: true,
  //       error: err
  //     });
  //   }
  // }

  // async retrieveCustomer(customerId: string): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const customer = await stripe.customers.retrieve(customerId);

  //     return ResponseBuilder(customer, 'Retrieved valid Stripe customer', false);
  //   } catch (err) {
  //     return ResponseBuilder(null, 'Could not retrieve valid Stripe customer', true, {
  //       log: true,
  //       error: err
  //     });
  //   }
  // }

  // async getStripePublicToken(): Promise<ResponseBuilderData<any>> {
  //   try {
  //     return ResponseBuilder(process.env.STRIPE_PUBLIC_KEY, 'Retrieved valid Stripe token', false);
  //   } catch (err) {
  //     return ResponseBuilder(null, 'Could not retrieve valid Stripe token', true, {
  //       log: true,
  //       error: err
  //     });
  //   }
  // }

  // async getOrganizationSubscription(organizationId: number): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const { subscriptionId } = await this.organizationRepository.findOne({
  //       where: {
  //         id: organizationId
  //       }
  //     });

  //     if (subscriptionId === 'free') {
  //       return ResponseBuilder(null);
  //     }

  //     const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  //     return ResponseBuilder(subscription);
  //   } catch (err) {
  //     return ResponseBuilder(null, null, true, {
  //       error: err,
  //       log: true
  //     });
  //   }
  // }

  // async getCustomerRef(organizationId: number): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const { subscriptionId } = await this.organizationRepository.findOne({
  //       where: {
  //         id: organizationId
  //       }
  //     });

  //     const { customer: customerId } = await stripe.subscriptions.retrieve(subscriptionId);

  //     console.log('StripeService.getCustomerRef', organizationId, subscriptionId, customerId);

  //     const customer = await (<any>stripe.customers.retrieve(<any>customerId));

  //     const card = await stripe.customers.retrieveSource(<any>customerId, customer.default_source);

  //     return ResponseBuilder({
  //       customer,
  //       card
  //     });
  //   } catch (err) {
  //     return ResponseBuilder(null, null, true, {
  //       error: err,
  //       log: true
  //     });
  //   }
  // }

  // async updateCustomerCard(organizationId: number, token: string): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const { subscriptionId } = await this.organizationRepository.findOne({
  //       where: {
  //         id: organizationId
  //       }
  //     });

  //     const { customer: customerId } = await stripe.subscriptions.retrieve(subscriptionId);

  //     console.log('StripeService.updateCustomerCard', organizationId, subscriptionId, customerId);

  //     const source = await stripe.customers.createSource(<string>customerId, {
  //       source: token
  //     });

  //     await stripe.subscriptions.update(subscriptionId, {
  //       default_source: source.id
  //     });

  //     await stripe.customers.update(<string>customerId, {
  //       default_source: source.id
  //     });

  //     return ResponseBuilder(null, 'Updated card');
  //   } catch (err) {
  //     return ResponseBuilder(null, 'An error ocurred', true, {
  //       error: err,
  //       log: true
  //     });
  //   }
  // }

  // async updateSubscription(organizationId: number, payload: any): Promise<ResponseBuilderData<any>> {
  //   try {
  //     const { subscriptionId } = await this.organizationRepository.findOne({
  //       where: {
  //         id: organizationId
  //       }
  //     });

  //     const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  //     await stripe.subscriptions.update(subscriptionId, {
  //       cancel_at_period_end: false,
  //       items: [
  //         {
  //           id: subscription.items.data[0].id,
  //           plan: payload.planId
  //         }
  //       ]
  //     });

  //     await this.organizationRepository
  //       .createQueryBuilder()
  //       .update()
  //       .set({
  //         planId: payload.planId
  //       })
  //       .where({
  //         id: organizationId
  //       })
  //       .execute();

  //     return ResponseBuilder(null, 'Successfully updated subscription');
  //   } catch (err) {
  //     return ResponseBuilder(null, 'Could not update subscription', true, {
  //       error: err,
  //       log: true
  //     });
  //   }
  // }
}
