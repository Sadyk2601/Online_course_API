import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entity/assignment.entity';
import { AssignmentsService } from './assignment.service';
import { AssignmentsController } from './assignment.controller';
import { ModuleEntity } from '../modules/entity/module.entity';
import { ModulesModule } from '../modules/module.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, ModuleEntity]),
    ModulesModule,
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
