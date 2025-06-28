// src/student_courses/student-courses.module.ts
import { Module } from '@nestjs/common';
import { StudentCoursesService } from './student-course.service';
import { StudentCoursesController } from './student-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCourse } from './student-course.entity';
import { Course } from '../courses/course.entity';
import { CoursesModule } from '../courses/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCourse, Course]), CoursesModule],
  providers: [StudentCoursesService],
  controllers: [StudentCoursesController],
})
export class StudentCoursesModule {}
