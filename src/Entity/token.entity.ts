import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    refreshToken: string



}