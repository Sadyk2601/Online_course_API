import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssignmentsService } from './assignment.service';
import { ModulesService } from '../modules/module.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('modules/:moduleId/assignment')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly modulesService: ModulesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Assignments post' })
  @ApiResponse({
    status: 201,
    description: 'Assignments post',
  })
  async submitAssignment(
    @Param('moduleId') moduleId: string,
    @Req() req,
    @Body() dto: CreateAssignmentDto,
  ) {
    const module = await this.modulesService.findOne(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return this.assignmentsService.submit(req.user, module, dto.content);
  }

  @ApiOperation({ summary: 'Assignments get' })
  @ApiResponse({ status: 200, description: 'Assignments get succesfull' })
  @Get()
  async getAssignments(@Req() req) {
    return this.assignmentsService.findByStudent(req.user.id);
  }
}
