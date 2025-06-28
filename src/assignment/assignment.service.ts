import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entity/assignment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { ModuleEntity } from '../modules/entity/module.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
  ) {}

  async submit(student: User, module: ModuleEntity, content: string) {
    const assignment = this.assignmentRepo.create({
      student,
      module,
      content,
    });
    return this.assignmentRepo.save(assignment);
  }

  async findByStudent(studentId: string) {
    return this.assignmentRepo.find({
      where: { student: { id: studentId } },
      relations: ['module'],
    });
  }
}
