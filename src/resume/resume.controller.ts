import {
  BadRequestException,
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
import { Types } from 'mongoose';
import {
  LanguageDto,
  PersonalSkillDto,
  ProfessionalSkillDto,
  ResumeDto,
} from 'src/dto/Resume.dto';
import { PersonalSkill } from 'src/schema/Resume.schema';
import { ResumeService } from './resume.service';

@ApiTags('Resume')
@Controller('resume')
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

  @Post('personalSkill')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: PersonalSkillDto })
  create(@Body() personalSkillDto: PersonalSkillDto) {
    return this.resumeService.createPersonalSkill(personalSkillDto);
  }

  @Get('personalSkill/getAll')
  @UsePipes(new ValidationPipe())
  findAll(): Promise<PersonalSkill[]> {
    return this.resumeService.findAllPersonalSkill();
  }

  @Get('personalSkill/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.resumeService.findOnePersonalSkill(id);
  }

  @Put('personalSkill/:id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: PersonalSkillDto })
  async update(
    @Param('id') id: string,
    @Body() personalSkillDto: PersonalSkillDto,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const data = await this.resumeService.updatePersonalSkill(
      id,
      personalSkillDto,
    );
    return { message: 'Updated Successfully', data: data };
  }

  @Delete('personalSkill/:id')
  async remove(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Invalid ID format');
    const data = await this.resumeService.findOnePersonalSkill(id);
    if (!data) throw new BadRequestException('Data not found');
    await this.resumeService.deletePersonalSkill(id);
    return { message: 'Deleted Successfully' };
  }

  // Add Professional Skill
  @Post(':id/professionalSkills')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ProfessionalSkillDto })
  async addProfessionalSkill(
    @Param('id') id: string,
    @Body() professionalSkillDto: ProfessionalSkillDto,
  ) {
    const data = await this.resumeService.addProfessionalSkill(
      id,
      professionalSkillDto,
    );
    return { message: 'Created Successfully', data: data };
  }

  // Update Professional Skill
  @Put(':id/professionalSkills/:skillId')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ProfessionalSkillDto })
  async updateProfessionalSkill(
    @Param('id') id: string,
    @Param('skillId') skillId: string,
    @Body() professionalSkillDto: ProfessionalSkillDto,
  ) {
    const data = await this.resumeService.updateProfessionalSkill(
      id,
      skillId,
      professionalSkillDto,
    );
    return { message: 'Updated Successfully', data: data };
  }

  // Delete Professional Skill
  @Delete(':id/professionalSkills/:skillId')
  async removeProfessionalSkill(
    @Param('id') id: string,
    @Param('skillId') skillId: string,
  ) {
    await this.resumeService.removeProfessionalSkill(id, skillId);
    return { message: 'Deleted Successfully' };
  }

  // Add Language
  @UsePipes(new ValidationPipe())
  @Post(':id/languages')
  @ApiBody({ type: LanguageDto })
  async addLanguage(@Param('id') id: string, @Body() languageDto: LanguageDto) {
    const data = await this.resumeService.addLanguage(id, languageDto);
    return { message: 'Created Successfully', data: data };
  }

  // Update Language
  @Put(':id/languages/:languageId')
  @Post(':id/languages')
  @ApiBody({ type: LanguageDto })
  async updateLanguage(
    @Param('id') id: string,
    @Param('languageId') languageId: string,
    @Body() languageDto: LanguageDto,
  ) {
    const data = await this.resumeService.updateLanguage(
      id,
      languageId,
      languageDto,
    );
    return { message: 'Updated Successfully', data: data };
  }

  // Delete Language
  @Delete(':id/languages/:languageId')
  async removeLanguage(
    @Param('id') id: string,
    @Param('languageId') languageId: string,
  ) {
    await this.resumeService.removeLanguage(id, languageId);
    return { message: 'Deleted Successfully' };
  }
}
