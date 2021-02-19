import { Repository } from 'typeorm';
import Review from './entities/reviews.entity';
import { Logger } from '@nestjs/common';

export class ReviewRepository extends Repository<Review> {
  private logger = new Logger('Review Repository');
}
