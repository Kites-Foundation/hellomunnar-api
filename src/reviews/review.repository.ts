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
        facilityId,
        activityId,
        typeId,
      offset,
      page,
        date
    } = reviewFilterDto;
    const query = this.createQueryBuilder('reviews');
    query
      .leftJoin('reviews.user', 'user')
      .select(['reviews', 'reviews.user','user.email','user.googleImageUrl' ,'user.id', 'user.role'])
      .orderBy('reviews.date', 'DESC');

    if (userId) {
      query.andWhere('reviews.userId = :userId', { userId });
    }
    if (facilityId) {
      query.andWhere('reviews.facilityId = :facilityId', { facilityId });
    }
    if (activityId) {
      query.andWhere('reviews.activityId = :activityId', { activityId });
    }
    if (typeId) {
      query.andWhere('reviews.typeId = :typeId', { typeId });
    }
    if (date) {
      query.andWhere('reviews.date = :date', { date });
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
        activityId,
        typeId,
      imageUrls,
      title,
      rating,
      status,
        facilityId
    } = createReviewDto;
    const review = new Review();

    review.imageUrls = imageUrls;
    review.content = content;
    review.destinationId = destinationId;
    review.typeId = typeId;
    review.activityId = activityId;
    review.userId = userId;
    review.facilityId = facilityId;
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
