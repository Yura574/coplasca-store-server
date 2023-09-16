import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('bytea', { nullable: true }) // Для хранения бинарных данных
  data: Buffer
}
