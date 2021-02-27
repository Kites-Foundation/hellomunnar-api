import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleDTO {
  @ApiProperty({
    description: 'authtoken',
    type: 'string',
  })
  @IsString()
  readonly googleToken: string;
}
