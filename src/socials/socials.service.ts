import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Social } from 'src/schema/Social.schema';
import { SocialDto } from './../dto/Social.dto';

@Injectable()
export class SocialsService {
  constructor(@InjectModel(Social.name) private socialModel: Model<Social>) {}

  async getAllSocials() {
    return await this.socialModel.find();
  }

  async createSocial(createScoialDto: SocialDto): Promise<Social> {
    const existing = await this.socialModel.findOne({
      priority: createScoialDto.priority,
    });
    if (existing)
      throw new BadRequestException(
        `Priority ${createScoialDto.priority} already exists`,
      );

    return new this.socialModel(createScoialDto).save();
  }

  async getSocialById(id: string) {
    return this.findByIdOrThrow(id);
  }

  async updateSocial(id: string, socialDto: SocialDto) {
    await this.findByIdOrThrow(id);

    const existing = await this.socialModel.findOne({
      priority: socialDto.priority,
      _id: { $ne: id },
    });

    if (existing) {
      throw new BadRequestException(
        `Priority ${socialDto.priority} already exists`,
      );
    }

    return this.socialModel.findByIdAndUpdate(id, socialDto, { new: true });
  }

  async deleteSocial(id: string) {
    await this.findByIdOrThrow(id);
    const count = await this.socialModel.countDocuments();
    if (count < 1)
      throw new BadRequestException(
        'Can not delete the only existing social links',
      );
    return this.socialModel.findByIdAndDelete(id);
  }

  private async findByIdOrThrow(id: string): Promise<Social> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const data = await this.socialModel.findById(id);
    if (!data) {
      throw new BadRequestException('Data not found');
    }

    return data;
  }
}
