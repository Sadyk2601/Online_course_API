import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from './result.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorator/public.decorator';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('results')
@ApiBearerAuth()
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getResults(@CurrentUser() user: any) {
    return this.resultsService.getResults(user.sub);
  }
}
