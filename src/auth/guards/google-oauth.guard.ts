import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FulfillmentGoogleOAuthGuard extends AuthGuard(
  'google-fulfillment',
) {}

@Injectable()
export class InvestmentGoogleOAuthGuard extends AuthGuard(
  'google-investment',
) {}
