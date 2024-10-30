import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from '../cloudinary/cloudinary.config';
import { SkillDto, TechDto } from '../dto/skill.dto';
import { Skill, Tech } from '../schema/Skill.schema';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<Skill>,
    @InjectModel(Tech.name) private techModel: Model<Tech>,
  ) {}

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

  async createTech(techDto: TechDto) {
    return await new this.techModel(techDto).save();
  }

  async updateTech(id: string, techDto: TechDto) {
    return this.techModel.findByIdAndUpdate(id, techDto, { new: true });
  }

  async deleteTech(id: string) {
    return this.techModel.findByIdAndDelete(id);
  }
}
