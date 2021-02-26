import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/reviews.entity';

@Entity('users')
@Unique(['email'])
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  readonly role: string;
  @Column()
  userName: string;
  @Column()
  email: string;
  @Column({ nullable: true, length: 2000 })
  token: string;
  @Column({ nullable: true })
  googleId: string;
  @Column({ length: 2000 })
  googleImageUrl: string;
  @Column()
  status: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  sex: string;
  @Column({ nullable: true })
  contactNumber: string;
  @Column({ nullable: true })
  location: string;
  @Column({ nullable: true })
  lastLogin: Date;
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Review, (reviewUser) => reviewUser.user, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  reviewUser: Review[];
}
