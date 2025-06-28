import { Module } from '@nestjs/common';
import { ModulesService } from './module.service';
import { ModulesController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity as ModuleEntity } from './entity/module.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, Course])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
