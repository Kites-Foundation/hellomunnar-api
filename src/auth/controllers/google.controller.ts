import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from '../services';
import { GoogleDto } from '../dto/google.dto';

@ApiTags('Google Auth')
@Controller('google')
export class GoogleController {
  private logger = new Logger('Google Auth');
  constructor(private readonly googleService: GoogleService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  /*eslint-disable */
  async googleAuth(@Req() req) {}
  /*eslint-enable */

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    this.logger.verbose(`User Logged in ${req.user.email} `);
    return this.googleService.googleLogin(req);
  }
}
