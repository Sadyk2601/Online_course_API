import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonDto } from './create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {}

  async findByModule(moduleId: string): Promise<Lesson[]> {
    return this.lessonRepo.find({
      where: { module: { id: moduleId } },
      relations: ['module'],
    });
  }

  async create(moduleId: string, dto: CreateLessonDto) {
    const lesson = this.lessonRepo.create({ ...dto, module: { id: moduleId } });
    return this.lessonRepo.save(lesson);
  }
}
