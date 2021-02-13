import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleController } from './controllers/google.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleService } from './services/google.service';

@Module({
  imports: [PassportModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleService],
})
export class AuthModule {}
