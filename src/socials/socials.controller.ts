import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SocialDto } from 'src/dto/Social.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SocialsService } from './socials.service';

@ApiTags('socials')
@Controller('socials')
export class SocialsController {
  constructor(private socialsService: SocialsService) {}

  @Get()
  async getAllSocials() {
    return this.socialsService.getAllSocials();
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: SocialDto })
  async createSocial(@Body() payload: SocialDto) {
    return this.socialsService.createSocial(payload);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getSocialById(@Param('id') id: string) {
    return this.socialsService.getSocialById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: SocialDto })
  async updateSocial(@Param('id') id: string, @Body() payload: SocialDto) {
    return this.socialsService.updateSocial(id, payload);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteSocial(@Param('id') id: string) {
    return this.socialsService.deleteSocial(id);
  }
}
