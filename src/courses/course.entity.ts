import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  teacher: string;

  @Column()
  category: string;

  @Column()
  level: string;
}
