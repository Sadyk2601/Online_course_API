import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Courses')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha kurslarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Kurslar ro‘yxati muvaffaqiyatli qaytarildi',
  })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta kursni olish' })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli qaytarildi' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({ status: 201, description: 'Yangi kurs yaratildi' })
  @Roles('admin')
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Kursni ozgartirish' })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli ozgartirildi' })
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kursni ochirish' })
  @ApiResponse({ status: 204, description: 'Kurs ochirildi' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
