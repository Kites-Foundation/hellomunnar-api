import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController, GoogleController } from './controllers';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './strategy';
import { AuthService, GoogleService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [GoogleController, AuthController],
  providers: [
    GoogleStrategy,
    GoogleService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
