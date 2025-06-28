import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CoursesController } from './course.controller';
import { CoursesService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
