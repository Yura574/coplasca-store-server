import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
