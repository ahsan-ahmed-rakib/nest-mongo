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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { SkillDto, TechDto } from '../dto/skill.dto';
import { SkillService } from './skill.service';

@ApiTags('Skills')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SkillDto })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SkillDto })
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

  @Post('tech')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: TechDto })
  async createTechnical(@Body() techDto: TechDto) {
    const data = await this.skillService.createTech(techDto);
    return { message: 'Created Successfully', data: data };
  }

  @Patch('tech/:id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: TechDto })
  async updateTechnical(@Param('id') id: string, @Body() techDto: TechDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedTech = await this.skillService.updateTech(id, techDto);
    if (!updatedTech) throw new HttpException('User not found', 404);
    return { message: 'Updated Successfully', data: updatedTech };
  }

  @Delete('tech/:id')
  @UsePipes(new ValidationPipe())
  async deleteTech(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedTech = await this.skillService.deleteTech(id);
    if (!deletedTech) throw new HttpException('Data Not Found', 404);
    return { message: 'Deleted Successfully', id: id };
  }
}
