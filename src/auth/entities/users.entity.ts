import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Review from '../../reviews/entities/reviews.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity('users')
@Unique(['email'])
export default class Users {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  userName: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  @Exclude()
  password: string;
  @Column({ nullable: true, length: 2000 })
  token: string;
  @Column({ nullable: true })
  googleId: string;
  @Column({ length: 2000 })
  googleImageUrl: string;
  @Column({ nullable: true })
  facebookId: string;
  @Column({ nullable: true, length: 200 })
  facebookImageUrl: string;
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
