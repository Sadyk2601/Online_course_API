import { Controller, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('modules/:moduleId/assignment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  submitAssignment(
    @Body() dto: CreateAssignmentDto,
    @Param('moduleId') moduleId: string,
    @CurrentUser() user: any,
  ) {
    return this.assignmentsService.submit(dto, user.sub, moduleId);
  }
}
