import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './result.controller';
import { ResultsService } from './result.service';
import { Assignment } from '../assignment/entity/assignment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), AuthModule],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
