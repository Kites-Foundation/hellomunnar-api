import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uuid: string;
  @Column()
  name: string;
  @Column()
  userName: string;
  @Column()
  email: string;
  @Column({nullable: true})
  password: string;
  @Column({ nullable: true, length: 2000 })
  token: string;
  @Column({ length: 2000 })
  googleId: string;
  @Column({ length: 2000 })
  googleImageUrl: string;
  @Column({nullable: true,  length: 200 })
  facebookId: string;
  @Column({nullable: true, length: 200 })
  facebookImageUrl: string;
  @Column()
  status: string;
  @Column()
  type: string;
  @Column({nullable: true})
  sex: string;
  @Column({nullable: true})
  contactNumber: string;
  @Column({nullable: true})
  location: string;
  @Column({nullable: true})
  lastLogin: Date;
  @CreateDateColumn()
  createdAt: Date;
}
