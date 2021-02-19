import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 'asdasdasdsa', description: 'User Id as UUID' })
  userId: string;

  @ApiProperty({ example: 'asdasdasd', description: 'facility Id uuid' })
  facilityId: string;

  @ApiProperty({ example: 'sdasvdjaskdasd', description: 'Destination UUID' })
  destinationId: string;

  @ApiProperty({ example: 'Tasdasdasdasdasd', description: 'Type ID uuid' })
  typeId: string;

  @ApiProperty({ example: 'asdasdaasfsaf', description: 'Role String' })
  @IsString()
  role: string;
}
