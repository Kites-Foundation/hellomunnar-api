import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewFilterDto {
  @ApiProperty({ example: null, required: false })
  @IsOptional()
  userId: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  destinationId: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  facilityId: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  activityId: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  typeId: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  status: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  page: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  offset: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  limit: number;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  date: Date;
}
