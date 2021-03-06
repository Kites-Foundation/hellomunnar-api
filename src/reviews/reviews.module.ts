import { CacheModule, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../auth/entities/users.entity';
import { UserRepository } from '../auth/user.repository';
import { ReviewRepository } from './review.repository';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.X_REDIS_HOST,
      port: process.env.X_REDIS_PORT,
    }),
    AuthModule,
    TypeOrmModule.forFeature([Users, UserRepository]),
    TypeOrmModule.forFeature([Review, ReviewRepository]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
