import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

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
    @Column()
    token: string;
    @Column()
    googleId: string;
    @Column()
    googleImageUrl: string;
    @Column()
    facebookId: string;
    @Column()
    facebookImageUrl: string;
    @Column()
    status: string;
    @Column()
    type: string;
    @Column()
    sex: string;
    @Column()
    contactNumber: string;
    @Column()
    location: string;
    @Column()
    lastLogin: Date;
    @CreateDateColumn()
    createdAt: Date;
}


