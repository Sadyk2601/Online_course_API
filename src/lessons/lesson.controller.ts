// src/lessons/lesson.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lessons')
@ApiBearerAuth()
@Controller('modules/:moduleId/lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  @ApiOperation({ summary: 'Get lessons' })
  @ApiResponse({ status: 200, description: 'Get lessons succesfully' })
  getLessons(@Param('moduleId') moduleId: string) {
    return this.lessonService.findByModule(moduleId);
  }

  @Post()
  @ApiOperation({ summary: 'Post lesson' })
  @ApiResponse({ status: 201, description: 'Post lesson succesfully' })
  createLesson(
    @Param('moduleId') moduleId: string,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonService.create(moduleId, dto);
  }
}
