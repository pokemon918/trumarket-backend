import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

const { THIS_BACKEND_URL } = process.env as { [k: string]: string };

const getConfig = (cbAuthPathname: string) => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${THIS_BACKEND_URL}/auth/google/${cbAuthPathname}`,
  scope: ['email', 'profile'],
});

const formatProfile = (profile: any) => {
  const { name, emails } = profile;

  return {
    source: 'external' as const,
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName,
  };
};

@Injectable()
export class FulfillmentGoogleStrategy extends PassportStrategy(
  Strategy,
  'google-fulfillment',
) {
  constructor() {
    super(getConfig('fulfillment'));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<ExternalUser> {
    return formatProfile(profile);
  }
}

@Injectable()
export class InvestmentGoogleStrategy extends PassportStrategy(
  Strategy,
  'google-investment',
) {
  constructor() {
    super(getConfig('investment'));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<ExternalUser> {
    return formatProfile(profile);
  }
}
