import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../auth/entities/users.entity';
import { UserRepository } from '../auth/user.repository';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserRepository]),
    TypeOrmModule.forFeature([Review, ReviewRepository]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
