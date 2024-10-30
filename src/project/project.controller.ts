import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from 'src/dto/Project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProject() {
    return this.projectService.getProject();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ProjectDto })
  async createProject(
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new HttpException('File is required!', 400);
    const data = await this.projectService.createProject(projectDto, file);
    return { message: 'Created Successfully', data: data };
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }
}
