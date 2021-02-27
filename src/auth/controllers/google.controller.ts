import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Logger,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from '../services';
import { GoogleDTO } from '../dto';

@ApiTags('Google Auth')
@Controller('google')
export class GoogleController {
  private logger = new Logger('Google Auth');
  constructor(private readonly googleService: GoogleService) {}
  @Post()
  /*eslint-disable */
  async googleAuth(@Body() body: GoogleDTO) {
    return this.googleService.googleLogin(body.googleToken);
  } /*eslint-enable */

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    this.logger.verbose(`User Logged in ${req.user.email} `);
    return this.googleService.googleLogin(req);
  }
}
