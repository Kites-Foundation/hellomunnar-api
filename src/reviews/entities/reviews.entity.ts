import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Users from '../../auth/entities/users.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  destinationId: number;

  @Column({ nullable: true })
  activityId: number;

  @Column({ nullable: true })
  facilityId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  rating: number;

  @Column()
  date: Date;

  @Column({nullable: true})
  typeId: number;

  @Column()
  status: string;

  @Column({ length: 2000, nullable: true })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  imageUrls: any;

  @ManyToOne((type) => Users, (user) => user)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: Users;
}
