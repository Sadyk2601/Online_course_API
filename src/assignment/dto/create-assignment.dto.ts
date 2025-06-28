import { IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  content: string;
}
