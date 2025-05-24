import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { HomeDto } from 'src/dto/Home.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: HomeDto })
  async createHome(
    @Body() homeDto: HomeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) return new HttpException('File is required', 400);
    return this.homeService.createHome(homeDto, file);
  }

  @Get()
  getHome() {
    return this.homeService.getHome();
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: HomeDto })
  async updateHome(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() homeDto: HomeDto,
    @Body('profileId') profileId: string, // Get the old image's publicId if available
  ) {
    // Validate the ID
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return new HttpException('Invalid ID', 400);

    let profilePicture: string | undefined;
    let newProfileId: string | undefined;

    if (file) {
      if (profileId) {
        await this.homeService.deleteImage(profileId);
      }

      const uploadResult = await this.homeService.uploadImage(file);
      profilePicture = uploadResult.secure_url;
      newProfileId = uploadResult.public_id;
    }

    const updateHome = await this.homeService.updateHome(id, {
      ...homeDto,
      ...(profilePicture && { profilePicture }),
      ...(newProfileId && { profileId: newProfileId }),
    });

    if (!updateHome) throw new HttpException('Data not found', 404);

    return { message: 'Updated Successfully', data: updateHome };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHome(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    await this.homeService.deleteHome(id);
    return { message: 'Deleted Successfully', id: id };
  }
}
