// src/student_courses/student-course.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class StudentCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.studentCourses)
  student: User;

  @ManyToOne(() => Course, (course) => course.studentCourses)
  course: Course;

  @CreateDateColumn()
  enrolledAt: Date;
}
