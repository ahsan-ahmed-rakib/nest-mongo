import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ImageController } from './image/image.controller';

@Module({
  providers: [CloudinaryService],
  controllers: [ImageController],
})
export class ImageModule {}
