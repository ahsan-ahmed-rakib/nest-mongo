import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ProjectDto } from 'src/dto/Project.dto';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getProject() {
    return this.projectService.getProject();
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ProjectDto })
  async updateProject(
    @Param('id') id: string,
    @Body() projectDto: ProjectDto,
    @Body('imageId') imageId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    let image: string | undefined;
    let newImageId: string | undefined;

    if (file) {
      if (imageId) {
        await this.projectService.deleteImage(imageId);
      }
    }

    const result = await this.projectService.uploadImage(file);
    image: result.secure_url;
    newImageId: result.public_id;

    const updatedData = await this.projectService.updatProject(id, {
      ...projectDto,
      ...(image && { image }),
      ...(newImageId && { imageId: newImageId }),
    });

    if (!updatedData) throw new HttpException('Data not found!', 404);
    return { message: 'Updated Successfully', data: updatedData };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);
    await this.projectService.deleteProject(id);
    return { message: 'Deleted Successfully' };
  }
}
