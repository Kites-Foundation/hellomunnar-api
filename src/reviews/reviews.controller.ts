import { Body, Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('/api/v1/reviews')
export class ReviewsController {
  private logger = new Logger('Review Controller');
  constructor(private reviewService: ReviewsService) {}

  @Get('reviews-stats')
  getStats(@Body() data: any): Promise<any> {
    const userId = data.userId;
    return this.reviewService.getStats(userId);
  }
}
