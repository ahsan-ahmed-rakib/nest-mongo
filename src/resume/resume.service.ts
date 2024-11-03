import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LanguageDto,
  PersonalSkillDto,
  ProfessionalSkillDto,
  ResumeDto,
} from 'src/dto/Resume.dto';
import {
  PersonalSkill,
  PersonalSkillDocument,
  Resume,
} from 'src/schema/Resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<Resume>,
    @InjectModel(PersonalSkill.name)
    private personalSkillModel: Model<PersonalSkillDocument>,
  ) {}

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

  async createPersonalSkill(personalSkillDto: PersonalSkillDto) {
    const profile = new this.personalSkillModel(personalSkillDto);
    return profile.save();
  }

  async findAllPersonalSkill() {
    return this.personalSkillModel.find().exec();
  }

  async findOnePersonalSkill(id: string) {
    return this.personalSkillModel.findById(id).exec();
  }

  async updatePersonalSkill(id: string, personalSkillDto: PersonalSkillDto) {
    return this.personalSkillModel
      .findByIdAndUpdate(id, personalSkillDto, { new: true })
      .exec();
  }

  async deletePersonalSkill(id: string) {
    return this.personalSkillModel.findByIdAndDelete(id).exec();
  }

  async addProfessionalSkill(
    id: string,
    professionalSkillDto: ProfessionalSkillDto,
  ) {
    return this.personalSkillModel
      .findByIdAndUpdate(
        id,
        { $push: { professionalSkills: professionalSkillDto } },
        { new: true },
      )
      .exec();
  }

  // Update a specific Professional Skill by ID
  async updateProfessionalSkill(
    personalSkillId: string,
    skillId: string,
    professionalSkillDto: ProfessionalSkillDto,
  ) {
    return this.personalSkillModel
      .findOneAndUpdate(
        { _id: personalSkillId, 'professionalSkills._id': skillId },
        { $set: { 'professionalSkills.$': professionalSkillDto } },
        { new: true },
      )
      .exec();
  }

  // Remove a Professional Skill by ID
  async removeProfessionalSkill(personalSkillId: string, skillId: string) {
    return this.personalSkillModel
      .findByIdAndUpdate(
        personalSkillId,
        { $pull: { professionalSkills: { _id: skillId } } },
        { new: true },
      )
      .exec();
  }

  // Add a new Language in laguage object
  async addLanguage(id: string, languageDto: LanguageDto) {
    return this.personalSkillModel
      .findByIdAndUpdate(
        id,
        { $push: { languages: languageDto } },
        { new: true },
      )
      .exec();
  }

  // Update a specific Language by ID
  async updateLanguage(
    personalSkillId: string,
    languageId: string,
    languageDto: LanguageDto,
  ) {
    return this.personalSkillModel
      .findOneAndUpdate(
        { _id: personalSkillId, 'languages._id': languageId },
        { $set: { 'languages.$': languageDto } },
        { new: true },
      )
      .exec();
  }

  // Remove a Language by ID
  async removeLanguage(personalSkillId: string, languageId: string) {
    return this.personalSkillModel
      .findByIdAndUpdate(
        personalSkillId,
        { $pull: { languages: { _id: languageId } } },
        { new: true },
      )
      .exec();
  }
}
