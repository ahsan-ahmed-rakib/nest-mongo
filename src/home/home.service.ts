import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { HomeDto } from 'src/dto/Home.dto';
import { Home } from 'src/schema/Home.schema';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  async getHome() {
    return this.homeModel.find();
  }

  async createHome(homeDto: HomeDto, file: Express.Multer.File): Promise<Home> {
    if (!file) {
      throw new BadRequestException('File is required'); // Throw an exception if the file is missing
    }
    const imageUploadResult = await this.uploadImage(file);
    const createdHome = new this.homeModel({
      ...homeDto,
      profilePicture: imageUploadResult.secure_url,
      profileId: imageUploadResult.public_id,
    });
    return await createdHome.save();
  }

  async updateHome(id: string, homeDto: Partial<HomeDto>) {
    return this.homeModel.findByIdAndUpdate(
      id,
      { $set: homeDto },
      { new: true },
    );
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

  async deleteHome(id: string): Promise<void> {
    const home = await this.homeModel.findById(id);
    if (!home) throw new NotFoundException('Data not found');
    if (home.profileId) {
      await this.deleteImage(home.profileId);
    }
    return this.homeModel.findByIdAndDelete(id);
  }
}
