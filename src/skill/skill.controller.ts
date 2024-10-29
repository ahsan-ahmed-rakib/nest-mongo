import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkillDataDto } from 'src/dto/skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async createSkill(
    @Body() skillDataDto: SkillDataDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) return new HttpException('File required!', 400);
    return this.skillService.createSkill(skillDataDto, file);
  }

  @Get()
  getSkill() {
    return this.skillService.getSkill();
  }
}
