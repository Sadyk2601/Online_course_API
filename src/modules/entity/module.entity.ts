import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entity/lesson.entity';
import { Assignment } from 'src/assignment/entity/assignment.entity';

@Entity()
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Course, (course) => course.module, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @OneToMany(() => Assignment, (a) => a.module)
  assignments: Assignment[];
}
