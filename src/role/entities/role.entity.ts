import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Users from '../../auth/entities/users.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  destinationId: number;

  @Column({ nullable: true }) // for future use
  facilityId: number;

  @Column({ nullable: true }) // for future use
  typeId: number;

  @Column({ length: 256 })
  role: string;

  @ManyToOne((type) => Users, (user) => user.role)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  createdBy: number;
}
