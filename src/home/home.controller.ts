import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { HomeDto } from 'src/dto/Home.dto';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post('home')
  @UsePipes(new ValidationPipe())
  async createHome(@Body() homeDto: HomeDto) {
    return this.homeService.createHome(homeDto);
  }

  @Put('home/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() homeDto: HomeDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return new HttpException('Inalid ID', 400);
    const updateHome = await this.homeService.updateHome(id, homeDto);
    if (!updateHome) throw new HttpException('Data not found', 404);
    return updateHome;
  }

  // image upload
  // Endpoint to upload a new image
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.homeService.uploadImage(file);
    return {
      url: result.secure_url, // URL of the uploaded image
      publicId: result.public_id, // ID of the image for future reference
    };
  }

  // Endpoint to update an existing image
  @Put('update')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('publicId') publicId: string,
  ) {
    // Delete the old image
    await this.homeService.deleteImage(publicId);

    // Upload the new image
    const result = await this.homeService.uploadImage(file);
    return {
      url: result.secure_url, // New URL of the uploaded image
      publicId: result.public_id, // New ID of the image
    };
  }
}
