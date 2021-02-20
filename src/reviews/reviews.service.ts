import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto, ReviewFilterDto } from './dto';
import { Review } from './entities/reviews.entity';
import { AuthService } from '../auth/services';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    private authService: AuthService,
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
    const access = await this.authService.getUserById(req.user.id);
    if (access.role === 'admin') {
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
  } else{
      throw new UnauthorizedException(
          'UnAuthorized',
          'You are not Authorized to access this endpoint ',
      );
    }
  }
  async deleteReview(id: number, req: any): Promise<any> {
    const user = await this.authService.getUserById(req.user.id);
    if (user.role === 'admin') {
      const result = await this.reviewRepository.delete({ id });

      if (result.affected === 0) {
        throw new NotFoundException(`Review with ${id} not found`);
      }
      return {
        success: true,
        message: 'Review deleted Successfully',
      };
    } else {
      throw new UnauthorizedException(
        'UnAuthorized',
        'You are not Authorized to access this endpoint ',
      );
    }
  }
}
