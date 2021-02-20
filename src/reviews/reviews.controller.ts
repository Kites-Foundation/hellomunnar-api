import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put, Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, ReviewFilterDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Review } from './entities/reviews.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Reviews')
@Controller('api/v1/reviews')
export class ReviewsController {
  private logger = new Logger('Review Controller');
  constructor(private reviewService: ReviewsService) {}

  @Get('reviews-stats')
  getStats(@Req() req: any): Promise<any> {
    const userId = req.user.id;
    return this.reviewService.getStats(userId);
  }

  @Get('all-reviews')
  getAllReviews(
    @Body() reviewFilterDto: ReviewFilterDto,
    @Req() req: any,
  ): Promise<any> {
    this.logger.verbose('User Logged in', req);
    return this.reviewService.getAllReviews(reviewFilterDto);
  }

  @Post('create-review')
  createReview(
    @Request() req: any,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    createReviewDto.userId = req.user.id;
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('get-review/:id')
  getReviewById(@Param('id') id: number): Promise<Review> {
    return this.reviewService.getReviewById(id);
  }

  @Put('update-status/:id')
  updateReviewStatus(
    @Param('id') id: number,
    @Body('status') status: string,
    @Request() req: any,
  ) {
    return this.reviewService.updateReviewStatus(id, status, req);
  }

  @Delete('delete/:id')
  destroyReview(@Request() req: any, @Param('id') id: number) {
    this.logger.verbose(`Review with ${id} deleted`);
    return this.reviewService.deleteReview(id);
  }
}
