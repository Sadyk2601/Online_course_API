import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ModulesService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new module' })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  findAll() {
    return this.modulesService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get modules by course ID' })
  findByCourse(@Param('courseId') courseId: string) {
    return this.modulesService.findByCourse(courseId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a module by ID' })
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a module by ID' })
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
