import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { SkillDto, TechDto } from 'src/dto/skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Get()
  getAllSkill() {
    return this.skillService.getSkills();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async createSkill(
    @Body() skillDto: SkillDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) return new HttpException('File required!', 400);
    const skill = await this.skillService.createSkill(skillDto, file);
    return {
      message: 'Created Successfully',
      data: skill,
    };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  async updateSkill(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined, // Allow file to be undefined
    @Body() skillDto: SkillDto,
    @Body('imageId') imageId: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);

    const updateData: Partial<SkillDto> = { ...skillDto }; // Start with the fields from skillDto

    // Process file upload if a file is provided
    if (file) {
      if (imageId) {
        await this.skillService.deleteImage(imageId); // Delete the old image if it exists
      }

      const uploadResult = await this.skillService.uploadImage(file);
      updateData.image = uploadResult.secure_url; // Update with new image URL
      updateData.imageId = uploadResult.public_id; // Update with new image ID
    }

    const updatedSkill = await this.skillService.updateSkill(id, updateData);

    if (!updatedSkill) throw new HttpException('Data not found', 404);

    return { message: 'Updated Successfully', data: updatedSkill };
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    await this.skillService.deleteSkill(id);
    return { message: 'Delete Successfully', id: id };
  }

  @Post('technical')
  @UsePipes(new ValidationPipe())
  createTechnical(@Body() techDto: TechDto) {
    console.log(techDto);
    return this.skillService.createTech(techDto);
  }

  @Patch('technical/:id')
  @UsePipes(new ValidationPipe())
  async updateTechnical(@Param('id') id: string, @Body() techDto: TechDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedTech = await this.skillService.updateTech(id, techDto);
    if (!updatedTech) throw new HttpException('User not found', 404);
    return { message: 'Updated Successfully', data: updatedTech };
  }
}
