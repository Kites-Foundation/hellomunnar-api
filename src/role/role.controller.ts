import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Role Management')
@Controller('api/v1/role')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  private logger = new Logger('Role Controller');
  constructor(private readonly roleService: RoleService) {}

  @Get('all-roles')
  getAllRoles(@Request() req: any) {
    this.logger.verbose(`retrieving all roles`);
    return this.roleService.getAllRoles();
  }

  @Get('/:userId')
  getUserRole(@Param('userId') userId: number): Promise<any> {
    return this.roleService.getUserRole(userId);
  }

  @Post('add-role')
  addRole(@Body() roleDto: RoleDto) {
    this.logger.verbose('adding new role');
    return this.roleService.addRole(roleDto);
  }

  @Delete('/:id')
  deleteRole(@Param('id') id: number): Promise<any> {
    this.logger.verbose('deleting a role');
    return this.roleService.deleteRole(id);
  }

  @Patch('/:id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoleDto,
  ): Promise<any> {
    this.logger.verbose('updating a role');
    return this.roleService.updateRole(id, body);
  }
}
