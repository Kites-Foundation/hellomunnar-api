import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from '../services/google.service';

@ApiTags('Google Auth')
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  /*eslint-disable */
  async googleAuth(@Req() req) {}
  /*eslint-enable */

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleService.googleLogin(req);
  }
}
