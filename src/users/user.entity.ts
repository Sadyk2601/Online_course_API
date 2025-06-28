import { StudentCourse } from 'src/student_courses/student-course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 'student' })
  role: 'student' | 'admin';

  @OneToMany(() => StudentCourse, (sc) => sc.student)
  studentCourses: StudentCourse[];
}
