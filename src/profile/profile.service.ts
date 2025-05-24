import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { Profile } from 'src/schema/Profile.schema';
import { ProfileDto } from './../dto/Profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async getProfile() {
    return this.profileModel.find();
  }

  async createProfile(
    profileDto: ProfileDto,
    file: Express.Multer.File,
  ): Promise<Profile> {
    if (!file) throw new Error('Profile picture is required');
    const imageUploadResult = await this.uploadImage(file);
    const createdHome = new this.profileModel({
      ...profileDto,
      profilePicture: imageUploadResult.secure_url,
      profilePictureId: imageUploadResult.public_id,
    });
    return await createdHome.save();
  }

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
    const home = await this.profileModel.findById(id);
    if (!home) throw new NotFoundException('Data not found');
    if (home.profilePictureId) {
      await this.deleteImage(home.profilePictureId);
    }
    return this.profileModel.findByIdAndDelete(id);
  }
}
