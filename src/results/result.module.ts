import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './result.controller';
import { ResultsService } from './result.service';
import { Assignment } from '../assignment/entity/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
