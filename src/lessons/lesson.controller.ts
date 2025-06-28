// src/lessons/lesson.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './create-lesson.dto';

@Controller('modules/:moduleId/lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  getLessons(@Param('moduleId') moduleId: string) {
    return this.lessonService.findByModule(moduleId);
  }

  @Post()
  createLesson(
    @Param('moduleId') moduleId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonService.create(moduleId, dto);
  }
}
