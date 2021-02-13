import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleController } from './controllers/google.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleService } from './services/google.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import Users from "./entities/user.entity";

@Module({
  imports: [PassportModule,
  TypeOrmModule.forFeature([Users])
  ],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleService],
})
export class AuthModule {}
