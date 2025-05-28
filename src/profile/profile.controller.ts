import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from 'src/dto/Profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ProfileDto })
  async createHome(
    @Body() profileDto: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File is required!');
    const data = await this.profileService.createProfile(profileDto, file);
    return {
      message: 'Created Successfully',
      data: data,
    };
  }

  @Get()
  async getProfile() {
    return await this.profileService.getProfile();
  }

  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return await this.profileService.getSingleProfile(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ProfileDto })
  async updateProfile(
    @Param('id') id: string,
    @Body() profileDto: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.profileService.updateProfile(id, file, profileDto);

    return {
      message: 'Updated Successfully',
      data: data,
    };
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileService.deleteProfile(id);
    return { message: 'Deleted Successfully', id: id };
  }
}
