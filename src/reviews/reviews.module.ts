import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../auth/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Review]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
