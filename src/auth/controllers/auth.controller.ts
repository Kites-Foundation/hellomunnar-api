import {
  Controller,
  Logger
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services';

@ApiBearerAuth()
@ApiTags('Auth Management')
@Controller('api/v1/auth')
export class AuthController {
  private logger = new Logger('Auth Controller');
  constructor(private readonly authService: AuthService) {}


}
