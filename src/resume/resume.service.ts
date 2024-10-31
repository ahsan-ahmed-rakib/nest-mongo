import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResumeDto } from 'src/dto/Resume.dto';
import { Resume } from 'src/schema/Resume.schema';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume.name) private resumeModel: Model<Resume>) {}

  async getAllResume() {
    return this.resumeModel.find();
  }

  async createResume(resume: ResumeDto) {
    return new this.resumeModel(resume).save();
  }

  async getResumeById(id: string) {
    return this.resumeModel.findById(id);
  }

  async updateResume(id: string, resume: ResumeDto) {
    return this.resumeModel.findByIdAndUpdate(id, resume, { new: true });
  }

  async deleteResume(id: string) {
    return this.resumeModel.findByIdAndDelete(id);
  }
}
