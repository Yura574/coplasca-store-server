import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Token} from './token.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    @Column({default: false})
    isActivated: boolean
    @Column()
    activationLink: string

    @Column({nullable: true})
    public currentHashedRefreshToken?: string;

    @OneToOne(()=> Token)
    @JoinColumn()
    token: Token
}
