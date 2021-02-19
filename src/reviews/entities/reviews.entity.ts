import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import  Users  from '../../auth/entities/users.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({nullable: true})
  destinationId: number;

  @Column({nullable: true})
  activityId: number;

  @Column({nullable: true})
  facilityId: number;
  @Column()
  title: string;

  @Column()
  rating: number;

  @Column()
  date: Date;

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
