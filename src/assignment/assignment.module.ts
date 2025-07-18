import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entity/assignment.entity';
import { AssignmentsService } from './assignment.service';
import { AssignmentsController } from './assignment.controller';
import { ModulesModule } from '../modules/module.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), ModulesModule],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
