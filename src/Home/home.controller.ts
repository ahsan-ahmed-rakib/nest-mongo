import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
}
