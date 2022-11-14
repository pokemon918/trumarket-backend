import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

const { THIS_BACKEND_URL } = process.env as { [k: string]: string };

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${THIS_BACKEND_URL}/auth/google`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<ExternalUser> {
    const { name, emails } = profile;

    return {
      source: "external",
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
  }
}
