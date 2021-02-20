import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  async getAllRoles(): Promise<any> {
    return this.roleRepository.getAllRoles();
  }
  async addRole(data: any): Promise<any> {
    data.status = 'ACTIVE';
    const addRole = await this.roleRepository.save(data);
    const { ...result } = addRole;
    return {
      success: true,
      message: 'added role to user',
      data: result,
    };
  }
  async getUserRole(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ id: id });
    if (user) {
      const { ...result } = user;
      return {
        success: true,
        data: result,
      };
    } else {
      throw new UnauthorizedException({
        detail: 'user not authorized to access this api',
        code: 'not_authorized',
      });
    }
  }
  async deleteRole(id: number): Promise<any> {
    const user = await this.roleRepository.findOne({ id: id });
    if (user) {
      await this.roleRepository.delete(user);
      return {
        success: true,
        message: 'Deleted Successfully',
      };
    } else {
      throw new UnauthorizedException({
        detail: 'user not authorized to access this api',
        code: 'not_authorized',
      });
    }
  }
  async updateRole(id: number, body: any): Promise<any> {
    const user = await this.roleRepository.findOne({ id: id });
    if (user) {
      if (body.userId) {
        user.userId = body.userId;
      }
      if (body.facilityId) {
        user.facilityId = body.facilityId;
      }
      if (body.destinationId) {
        user.destinationId = body.destinationId;
      }
      if (body.typeId) {
        user.typeId = body.typeId;
      }
      if (body.role) {
        user.role = body.role;
      }
      await this.roleRepository.save(user);
      return {
        success: true,
        message: 'Update Successful',
      };
    } else {
      throw new UnauthorizedException({
        detail: 'user not authorized to access this api',
        code: 'not_authorized',
      });
    }
  }

  async roleChecker(id: number, body: any): Promise<any>{
    const user = await this.roleRepository.findOne({id});
    if(user) {
      if(user.role === body.role){
        return {
          success: true,
          status: 200,
          role: body.role
        };
      }
    }
    else {
      throw new UnauthorizedException({
        detail: 'user not authorized to access this api',
        code: 'not_authorized',
      });
    }
  }
}
