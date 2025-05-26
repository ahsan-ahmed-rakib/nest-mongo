import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import mongoose, { Model } from 'mongoose';
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
    const data = new this.profileModel({
      ...profileDto,
      profilePicture: imageUploadResult.secure_url,
    }).save();
    return data;
  }

  async getSingleProfile(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Invalid ID');
    const data = await this.profileModel.findById(id);
    if (!data) throw new NotFoundException('Data not found');
    return data;
  }

  async updateProfile(
    id: string,
    file: Express.Multer.File,
    profileDto: ProfileDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Invalid ID');

    const singleData = await this.profileModel.findById(id);
    const profileId = this.getPublicId(singleData.profilePicture);

    let profilePicture: string | undefined;

    if (file) {
      if (!profileId)
        throw new BadRequestException('Profile picture id is required');
      if (profileId) {
        await this.deleteImage(profileId);
      }

      const uploadResult = await this.uploadImage(file);
      profilePicture = uploadResult.secure_url;
    }
    const updateProfile = await this.profileModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...profileDto,
          profilePicture: profilePicture,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );

    return updateProfile;
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
      throw new Error(`Failed to delete image: ` + JSON.stringify(error));
    }
  }

  async deleteProfile(id: string): Promise<void> {
    const home = await this.profileModel.findById(id);
    if (!home) throw new NotFoundException('Data not found');
    const profilePictureId = this.getPublicId(home.profilePicture);
    if (profilePictureId) {
      await this.deleteImage(profilePictureId);
    }
    return this.profileModel.findByIdAndDelete(id);
  }

  getPublicId = (url: string): string => {
    const parts = url.split('/upload/')[1];
    if (!parts) return '';
    const pathSegments = parts.split('/');
    if (
      pathSegments[0].startsWith('v') &&
      !isNaN(Number(pathSegments[0].slice(1)))
    ) {
      pathSegments.shift(); // remove the version segment like "v1748281955"
    }
    const publicIdWithExt = pathSegments.join('/');
    return publicIdWithExt.split('.')[0]; // remove extension
  };
}
