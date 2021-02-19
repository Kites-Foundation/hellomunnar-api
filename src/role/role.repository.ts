import { EntityRepository, Repository } from "typeorm";
import { Role } from "./entities/Role.entity";


@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    async getAllRoles(): Promise<Role[]> {
        const query = this.createQueryBuilder("role");
        return await query.getMany();
    }
}