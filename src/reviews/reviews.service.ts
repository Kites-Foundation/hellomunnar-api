import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto, ReviewFilterDto } from './dto';
import { Review } from './entities/reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async getStats(userId: number): Promise<any> {
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

  async getAllReviews(reviewFilterDto: ReviewFilterDto): Promise<any> {
    return this.reviewRepository.getAllReviews(reviewFilterDto);
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewRepository.createReview(createReviewDto);
  }

  async getReviewById(id: number): Promise<Review> {
    const foundReview = await this.reviewRepository.findOne({ id });

    if (!foundReview) {
      throw new NotFoundException(`Review with ${id} not found`);
    }
    return foundReview;
  }

  async updateReviewStatus(id: number, status: string, req: any): Promise<any> {
    const { user } = req;
    if (!user.id) {
      return;
    }
    const review = await this.reviewRepository.findOne({ id });
    if (!review) {
      throw new NotFoundException(`review with ${id} not found`);
    }
    review.status = status;
    await this.reviewRepository.save(review);
    return {
      success: true,
      message: 'Status Updated Successfully',
      review: review,
    };
  }
  async deleteReview(id: number): Promise<any> {
    const result = await this.reviewRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Review with ${id} not found`);
    }
    return {
      success: true,
      message: 'Review deleted Successfully',
    };
  }
}
