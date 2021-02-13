import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        `${process.env.HOST}/google/redirect` ||
        'http://localhost:3600/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos, displayName } = profile;
    const user = {
      userId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      displayName: displayName,
      picture: photos[0].value,
      accessToken,
      provider: profile.provider,
    };
    done(null, user);
  }
}
