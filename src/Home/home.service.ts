import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from 'src/schema/Home.schema';
import { HomeDto } from './../dto/Home.dto';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  async createHome(homeDto: HomeDto): Promise<Home> {
    const createdHome = new this.homeModel(homeDto);
    return await createdHome.save();
  }

  updateHome(id: string, homeDto: HomeDto) {
    return this.homeModel.findByIdAndUpdate(id, homeDto, { new: true });
  }
}
