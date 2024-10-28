import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import { Home } from 'src/schema/Home.schema';
import { HomeDto } from '../dto/Home.dto';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  async createHome(homeDto: HomeDto): Promise<Home> {
    const createdHome = new this.homeModel(homeDto);
    return await createdHome.save();
  }

  updateHome(id: string, homeDto: HomeDto) {
    return this.homeModel.findByIdAndUpdate(id, homeDto, { new: true });
  }

  // image update start

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'profile' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to delete image: ${error}`);
    }
  }

  // image update end
}
