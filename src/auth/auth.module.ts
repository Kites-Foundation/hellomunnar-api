import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers';
import { GoogleStrategy, } from './strategy';
import { AuthService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './entities/users.entity';
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
  controllers: [ AuthController],
  providers: [
    GoogleStrategy,
    AuthService
  ],
  exports: [AuthService],
})
export class AuthModule {}
