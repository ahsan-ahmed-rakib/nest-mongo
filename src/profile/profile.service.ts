import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Profile } from 'src/schema/Profile.schema';
import { ImageService } from './../common/image/image.service';
import { ProfileDto } from './../dto/Profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    private readonly imageService: ImageService,
  ) {}

  async getProfile() {
    return this.profileModel.find();
  }

  async createProfile(
    profileDto: ProfileDto,
    file: Express.Multer.File,
  ): Promise<Profile> {
    if (!file) throw new Error('Profile picture is required');
    const imageUploadResult = await this.imageService.uploadImage(file);
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
    const profileId = this.imageService.getPublicId(singleData.profilePicture);

    let profilePicture: string | undefined;

    if (file) {
      if (!profileId)
        throw new BadRequestException('Profile picture id is required');
      if (profileId) {
        await this.imageService.deleteImage(profileId);
      }

      const uploadResult = await this.imageService.uploadImage(file);
      profilePicture = uploadResult.secure_url;
    }
    const updateProfile = await this.profileModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...profileDto,
          profilePicture: profilePicture,
        },
      },
      { new: true },
    );

    return updateProfile;
  }

  async deleteProfile(id: string): Promise<void> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException('Invalid ID');
    const home = await this.profileModel.findById(id);
    if (!home) throw new NotFoundException('Data not found');
    const profilePictureId = this.imageService.getPublicId(home.profilePicture);
    if (profilePictureId) {
      await this.imageService.deleteImage(profilePictureId);
    }
    return this.profileModel.findByIdAndDelete(id);
  }
}
