import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async getStats(userId: string): Promise<any> {
    if (!userId) {
      return;
    }
    let query = this.reviewRepository.createQueryBuilder('reviews');
    query = query
      .select('reviews.status', 'status')
      .addSelect('count(*)', 'total')
      .groupBy('reviews.status');
    return await query.getRawMany();
  }
}
