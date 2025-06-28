// src/results/results.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entity/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
  ) {}

  async getStudentResults(studentId: string) {
    return this.assignmentRepo.find({
      where: { student: { id: studentId } },
      relations: ['module'],
      select: ['id', 'content', 'grade', 'submittedAt'],
    });
  }
}
