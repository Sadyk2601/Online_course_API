import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Module } from '../modules/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Module, (module) => module.lessons, { onDelete: 'CASCADE' })
  module: Module;
}
