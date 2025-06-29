import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCourse } from './entity/student-course.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class StudentCoursesService {
  constructor(
    @InjectRepository(StudentCourse)
    private readonly studentCourseRepo: Repository<StudentCourse>,
  ) {}

  async enroll(user: User, course: Course) {
    const exists = await this.studentCourseRepo.findOne({
      where: { student: { id: user.id }, course: { id: course.id } },
    });

    if (exists) throw new ConflictException('Already enrolled in this course');

    const enrollment = this.studentCourseRepo.create({
      student: user,
      course,
    });

    return this.studentCourseRepo.save(enrollment);
  }

  async getUserEnrollments(userId: string) {
    return this.studentCourseRepo.find({
      where: { student: { id: userId } },
      relations: ['course'],
    });
  }
}
