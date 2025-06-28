import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepo.find();
  }

  findOne(id: string) {
    return this.courseRepo.findOneBy({ id });
  }

  create(dto: CreateCourseDto) {
    const course = this.courseRepo.create(dto);
    return this.courseRepo.save(course);
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.courseRepo.update(id, dto);
    const updated = await this.courseRepo.findOneBy({ id });
    if (!updated) throw new NotFoundException();
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.courseRepo.delete(id);
    if (!deleted.affected) throw new NotFoundException();
    return { deleted: true };
  }
}
