import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  googleLogin(req) {
    if (!req.user) {
      return {
        message: 'No User from google',
        status: 403,
      };
    }
    return {
      message: 'User Retrieved from Google',
      status: 200,
      user: req.user,
    };
  }
}
