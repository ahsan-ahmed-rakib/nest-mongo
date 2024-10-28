import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('images')
export class ImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // Endpoint to upload a new image
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
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
    await this.cloudinaryService.deleteImage(publicId);

    // Upload the new image
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      url: result.secure_url, // New URL of the uploaded image
      publicId: result.public_id, // New ID of the image
    };
  }
}
