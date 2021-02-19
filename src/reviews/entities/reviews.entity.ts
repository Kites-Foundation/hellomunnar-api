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
  id: string;

  @Column()
  userId: string;

  @Column()
  destinationId: string;

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
