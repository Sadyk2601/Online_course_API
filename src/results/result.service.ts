import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entity/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Assignment)
    private repo: Repository<Assignment>,
  ) {}

  async getResults(studentId: string) {
    return this.repo.find({
      where: { student: { id: studentId } },
      relations: ['module'],
    });
  }
}
