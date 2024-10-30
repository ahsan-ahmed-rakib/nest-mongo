import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { ProjectDto } from 'src/dto/Project.dto';
import { Project } from 'src/schema/Project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(
    projectDto: ProjectDto,
    file: Express.Multer.File,
  ): Promise<Project> {
    const image = await this.uploadImage(file);
    const project = new this.projectModel({
      ...projectDto,
      image: image.secure_url,
      imageId: image.public_id,
    });
    return await project.save();
  }

  async getProject() {
    return this.projectModel.find();
  }

  async getProjectById(id: string) {
    return this.projectModel.findById(id);
  }

  async updatProject(id: string, projectDto: Partial<ProjectDto>) {
    return this.projectModel.findByIdAndUpdate(id, {
      $set: projectDto,
      new: true,
    });
  }

  async deleteProject(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'project' }, (error, result) => {
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
}
