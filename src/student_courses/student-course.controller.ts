import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentCoursesService } from './student-course.service';
import { EnrollDto } from './dto/enroll.dto';
import { CoursesService } from '../courses/course.service';
import { NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Student-course')
@ApiBearerAuth()
@Controller('enroll')
@UseGuards(JwtAuthGuard)
export class StudentCoursesController {
  constructor(
    private readonly studentCoursesService: StudentCoursesService,
    private readonly coursesService: CoursesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Post student-course' })
  async enroll(@Req() req, @Body() dto: EnrollDto) {
    const user = req.user;
    const course = await this.coursesService.findOne(dto.courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.studentCoursesService.enroll(user, course);
  }

  @Get()
  @ApiOperation({ summary: 'Get a student-course' })
  getEnrollments(@Req() req) {
    return this.studentCoursesService.getUserEnrollments(req.user.id);
  }
}
