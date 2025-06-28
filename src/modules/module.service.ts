import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from './entity/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    const course = await this.courseRepository.findOne({
      where: { id: createModuleDto.courseId },
    });

    if (!course) throw new NotFoundException('Course not found');

    const newModule = this.moduleRepository.create({
      title: createModuleDto.title,
      description: createModuleDto.description,
      course,
    });

    return this.moduleRepository.save(newModule);
  }

  findAll() {
    return this.moduleRepository.find({ relations: ['course'] });
  }

  async findOne(id: string) {
    return this.moduleRepository.findOne({
      where: { id },
    });
  }

  findByCourse(courseId: string) {
    return this.moduleRepository.find({
      where: { course: { id: courseId } },
      relations: ['course'],
    });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');

    Object.assign(module, updateModuleDto);
    return this.moduleRepository.save(module);
  }

  async remove(id: string) {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');
    return this.moduleRepository.remove(module);
  }
}
