import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
 Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, ReviewFilterDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Review } from './entities/reviews.entity';

@ApiBearerAuth()
@ApiTags('Reviews')
@Controller('api/v1/reviews')
export class ReviewsController {
  private logger = new Logger('Review Controller');
  constructor(private reviewService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('reviews-stats')
  getStats(@Request() req: any): Promise<any> {
    const userId = req.user.Id;
    return this.reviewService.getStats(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-reviews')
  getAllReviews(
    @Body() reviewFilterDto: ReviewFilterDto,
    @Request() req: any,
  ): Promise<any> {
    this.logger.verbose('User Logged in', req.user);
    return this.reviewService.getAllReviews(reviewFilterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create-review')
  createReview(
    @Request() req: any,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    this.logger.verbose('User Logged in', req.user);
    createReviewDto.userId = req.user.id;
    return this.reviewService.createReview(createReviewDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-review/:id')
  getReviewById(@Param('id') id: number): Promise<Review> {
    return this.reviewService.getReviewById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-status/:id')
  updateReviewStatus(
    @Param('id') id: number,
    @Body('status') status: string,
    @Request() req: any,
  ) {
    return this.reviewService.updateReviewStatus(id, status, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  destroyReview(@Request() req: any, @Param('id') id: number) {
    this.logger.verbose(`Review with ${id} deleted`);
    return this.reviewService.deleteReview(id);
  }
}
