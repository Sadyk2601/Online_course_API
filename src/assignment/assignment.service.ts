import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entity/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ModulesService } from '../modules/module.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private repo: Repository<Assignment>,
    private modulesService: ModulesService,
  ) {}

  async submit(dto: CreateAssignmentDto, studentId: string, moduleId: string) {
    const module = await this.modulesService.findOne(moduleId);

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const assignment = this.repo.create({
      content: dto.content,
      module,
      student: { id: studentId },
    });

    return this.repo.save(assignment);
  }

  async findAllForStudent(studentId: string) {
    return this.repo.find({ where: { student: { id: studentId } } });
  }
}
