import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentCoursesService } from './student-course.service';
import { EnrollDto } from './enroll.dto';
import { CoursesService } from '../courses/course.service';
import { NotFoundException } from '@nestjs/common';

@Controller('enroll')
@UseGuards(JwtAuthGuard)
export class StudentCoursesController {
  constructor(
    private readonly studentCoursesService: StudentCoursesService,
    private readonly coursesService: CoursesService,
  ) {}

  @Post()
  async enroll(@Req() req, @Body() dto: EnrollDto) {
    const user = req.user;
    const course = await this.coursesService.findOne(dto.courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.studentCoursesService.enroll(user, course);
  }

  @Get()
  getEnrollments(@Req() req) {
    return this.studentCoursesService.getUserEnrollments(req.user.id);
  }
}
