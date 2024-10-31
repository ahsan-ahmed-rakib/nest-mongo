import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResumeDto } from 'src/dto/Resume.dto';
import { ResumeService } from './resume.service';

@ApiTags('Resume')
@Controller('reume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get()
  async getResume() {
    return await this.resumeService.getAllResume();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ResumeDto })
  async createResume(@Body() resumeDto: ResumeDto) {
    const data = await this.resumeService.createResume(resumeDto);
    return { message: 'Created Successfully', data: data };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getResumeById(@Param('id') id: string) {
    return await this.resumeService.getResumeById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ResumeDto })
  async updateResume(@Param('id') id: string, @Body() resumeDto: ResumeDto) {
    const data = await this.resumeService.updateResume(id, resumeDto);
    return { message: 'Updated Successfully', data: data };
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteResume(@Param('id') id: string) {
    await this.resumeService.deleteResume(id);
    return { message: 'Deleted Successfully' };
  }
}
