import { StudentCourse } from 'src/student_courses/entity/student-course.entity';
import { ModuleEntity } from '../../modules/entity/module.entity';
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

  @OneToMany(() => ModuleEntity, (module) => module.course, {
    onDelete: 'CASCADE',
  })
  module: ModuleEntity;

  @OneToMany(() => StudentCourse, (sc) => sc.course)
  studentCourses: StudentCourse[];
}
