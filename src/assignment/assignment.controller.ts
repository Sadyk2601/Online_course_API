import { Controller, Post, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/types/request-with-user.interface';

@Controller('modules/:moduleId/assignment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  submitAssignment(
    @Body() dto: CreateAssignmentDto,
    @Param('moduleId') moduleId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.assignmentsService.submit(dto, req.user.sub, moduleId);
  }
}
