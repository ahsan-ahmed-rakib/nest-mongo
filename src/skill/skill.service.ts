import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { SkillDto } from 'src/dto/skill.dto';
import { Skill } from 'src/schema/Skill.schema';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async createSkill(
    skillDto: SkillDto,
    file: Express.Multer.File,
  ): Promise<Skill> {
    const image = await this.uploadImage(file);
    const skillData = {
      ...skillDto,
      image: image.secure_url,
      imageId: image.public_id,
    };
    const skills = new this.skillModel(skillData);
    return await skills.save();
  }

  async updateSkill(id: string, skillDto: Partial<SkillDto>) {
    return this.skillModel.findByIdAndUpdate(
      id,
      { $set: skillDto },
      { new: true },
    );
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

  async getSkills() {
    return this.skillModel.find();
  }

  async deleteSkill(id: string): Promise<void> {
    const skill = await this.skillModel.findById(id);
    if (!skill) throw new NotFoundException('Data not found');
    if (skill.imageId) {
      await this.deleteImage(skill.imageId);
    }
    return this.skillModel.findByIdAndDelete(id);
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to delete image: ${error}`);
    }
  }
}
