import {
  Body,
  Controller,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { HomeDto } from 'src/dto/Home.dto';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post('home')
  @UsePipes(new ValidationPipe())
  async createHome(@Body() homeDto: HomeDto) {
    return this.homeService.createHome(homeDto);
  }

  @Patch('home/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() homeDto: HomeDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return new HttpException('Inalid ID', 400);
    const updateHome = await this.homeService.updateHome(id, homeDto);
    if (!updateHome) throw new HttpException('Data not found', 404);
    return updateHome;
  }
}
