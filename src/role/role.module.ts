import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import  Users from "../auth/entities/users.entity";
import { RoleRepository } from "./role.repository";
import { UserRepository } from "../auth/user.repository";

@Module({
  imports:[
    TypeOrmModule.forFeature([Role, RoleRepository]),
    TypeOrmModule.forFeature([Users, UserRepository])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
