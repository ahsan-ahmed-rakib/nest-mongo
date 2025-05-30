import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PortfolioTextDto } from 'src/dto/PortfolioText.dto';
import { PortfolioText } from 'src/schema/PortfolioText.schema';

@Injectable()
export class PortfolioTextsService {
  constructor(
    @InjectModel(PortfolioText.name)
    private textModel: Model<PortfolioText>,
  ) {}

  async getAll() {
    return await this.textModel.find();
  }

  async createText(text: PortfolioTextDto): Promise<PortfolioText> {
    return new this.textModel(text).save();
  }

  async getSingleText(id: string): Promise<PortfolioText> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw new Error('Invalid ID');
    const data = await this.textModel.findById(id);
    if (!data) throw new Error('Data not found');
    return data;
  }

  async updateText(id: string, text: PortfolioTextDto): Promise<PortfolioText> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw new Error('Invalid ID');
    const existing = await this.textModel.findByIdAndUpdate(id, text, {
      new: true,
    });
    if (!existing) throw new Error('Data not found');
    return existing;
  }

  async deleteText(id: string): Promise<PortfolioText> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw new Error('Invalid ID');
    const count = await this.textModel.countDocuments();
    if (count < 1) throw new Error('Cannot delete the only existing text');
    const deletedText = await this.textModel.findByIdAndDelete(id);
    if (!deletedText) throw new Error('Data not found');
    return deletedText;
  }
}
