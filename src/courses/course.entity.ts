import { StudentCourse } from 'src/student_courses/student-course.entity';
import { Module } from '../modules/module.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => Module, (module) => module.course, { onDelete: 'CASCADE' })
  module: Module;

  @OneToMany(() => StudentCourse, (sc) => sc.course)
  studentCourses: StudentCourse[];
}
