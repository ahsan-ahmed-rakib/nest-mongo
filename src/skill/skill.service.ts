import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { Skill } from 'src/schema/Skill.schema';
import { SkillDataDto } from './../dto/skill.dto';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async createSkill(
    skillDataDto: SkillDataDto,
    file: Express.Multer.File,
  ): Promise<Skill> {
    const image = await this.uploadImage(file);
    const skillData = {
      ...skillDataDto,
      image: image.secure_url,
      imageId: image.public_id,
    };
    console.log(skillData);
    const skills = new this.skillModel(skillData);
    return await skills.save();
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'skill' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async getSkill() {
    return this.skillModel.find();
  }
}
