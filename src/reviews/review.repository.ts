import { EntityRepository, Repository } from 'typeorm';
import { Review } from './entities/reviews.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateReviewDto, ReviewFilterDto } from './dto';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  private logger = new Logger('Review Repository');

  async getAllReviews(reviewFilterDto: ReviewFilterDto): Promise<any> {
    const {
      userId,
      status,
      destinationId,
      limit,
      offset,
      page,
    } = reviewFilterDto;
    const query = this.createQueryBuilder('reviews');
    query
      .leftJoin('reviews.user', 'user')
      .select(['reviews', 'reviews.user', 'user', 'user.id'])
      .orderBy('reviews.date', 'DESC');

    if (userId) {
      query.andWhere('reviews.userId = :userId', { userId });
    }

    if (destinationId) {
      query.andWhere('reviews.destinationId = :destinationId', {
        destinationId,
      });
    }
    if (status) {
      query.andWhere('reviews.stats =:status', { status });
    }

    if (page && offset && limit) {
      const skip = offset * (page - 1);
      query.take(limit).skip(skip);
    }

    try {
      const [data, total] = await query.getManyAndCount();
      return {
        success: true,
        data,
        total,
      };
    } catch (e) {
      this.logger.error(
        `Failed to get reviews with filter: ${JSON.stringify(reviewFilterDto)}`,
        e.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<any> {
    const {
      userId,
      content,
      destinationId,
      imageUrls,
      title,
      rating,
      status,
    } = createReviewDto;
    const review = new Review();

    review.imageUrls = imageUrls;
    review.content = content;
    review.destinationId = destinationId;
    review.userId = userId;
    review.title = title;
    review.rating = rating;
    review.status = status;

    await this.save(review);
    return {
      success: true,
      message: 'Review submitted successfully',
      data: review,
    };
  }
}
