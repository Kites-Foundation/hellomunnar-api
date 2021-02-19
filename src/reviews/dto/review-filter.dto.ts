import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewFilterDto {
  @ApiProperty({ example: null })
  @IsOptional()
  userId: number;

  @ApiProperty({ example: null })
  @IsOptional()
  destinationId: number;

  @ApiProperty({ example: null })
  @IsOptional()
  status: string;

  @ApiProperty({ example: null })
  @IsOptional()
  page: number;

  @ApiProperty({ example: null })
  @IsOptional()
  offset: number;

  @ApiProperty({ example: null })
  @IsOptional()
  limit: number;
}
