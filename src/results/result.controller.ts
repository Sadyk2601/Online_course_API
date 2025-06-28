// src/results/results.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from './result.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Results')
@ApiBearerAuth()
@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  @ApiOperation({ summary: 'Get results' })
  async getResults(@Req() req) {
    return this.resultsService.getStudentResults(req.user.id);
  }
}
