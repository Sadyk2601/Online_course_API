// src/student_courses/dto/enroll.dto.ts
import { IsUUID } from 'class-validator';

export class EnrollDto {
  @IsUUID()
  courseId: string;
}
