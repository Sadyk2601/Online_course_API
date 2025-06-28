// src/results/results.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entity/assignment.entity';
import { ResultsService } from './result.service';
import { ResultsController } from './result.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
