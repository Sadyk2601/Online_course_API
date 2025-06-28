import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lesson.module';
import { CoursesModule } from './courses/course.module';
import { StudentCoursesModule } from './student_courses/student-course.module';
import { ModulesModule } from './modules/module.module';
import { AssignmentsModule } from './assignment/assignment.module';
import { ResultsModule } from './results/result.module';

import { User } from './users/entity/user.entity';
import { Course } from './courses/entities/course.entity';
import { ModuleEntity } from './modules/entity/module.entity';
import { Lesson } from './lessons/entity/lesson.entity';
import { Assignment } from './assignment/entity/assignment.entity';
import { StudentCourse } from './student_courses/entity/student-course.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Course, ModuleEntity, Lesson, Assignment, StudentCourse],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    LessonsModule,
    StudentCoursesModule,
    CoursesModule,
    ModulesModule,
    AssignmentsModule,
    ResultsModule,
  ],
})
export class AppModule {}
