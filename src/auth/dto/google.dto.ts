import { ApiProperty } from '@nestjs/swagger';

export class GoogleDto {
  @ApiProperty({ example: 'Kites Foundation', description: 'Full Name' })
  name: string;

  @ApiProperty({
    description: 'Email address',
    type: 'string',
    example: 'info@kitesfoundation.org',
  })
  email: any;

  @ApiProperty({
    description: 'unique ID from google',
    type: 'string',
    example: '131asdfa1f11v1v',
  })
  googleId: any;

  @ApiProperty({
    description: 'google Image Url',
    type: 'string',
    example: 'https://cdn.hellomunnar.in/logo.jpg',
  })
  googleImageUrl: any;

  @ApiProperty()
  userName: any;
  @ApiProperty()
  token: any;
  @ApiProperty()
  uuid: any;
  @ApiProperty()
  type: any;
  @ApiProperty()
  status: any;
}
