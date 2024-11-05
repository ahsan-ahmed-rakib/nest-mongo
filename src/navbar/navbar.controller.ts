import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { FooterDto, HeaderDto, NavbarDto } from 'src/dto/Navbar.dto';
import { NavbarService } from './navbar.service';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Navbar')
@Controller()
export class NavbarController {
  constructor(private navbarService: NavbarService) {}

  @Get('header')
  @UsePipes(new ValidationPipe())
  async getHeader() {
    return this.navbarService.getHeader();
  }

  @UseGuards(AuthGuard)
  @Post('header')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: HeaderDto })
  async createHeader(@Body() headerDto: HeaderDto) {
    const data = await this.navbarService.createHeader(headerDto);
    return {
      message: 'Created Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Get('header/:id')
  @UsePipes(new ValidationPipe())
  async getById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findHeader = await this.navbarService.getHeaderById(id);
    if (!findHeader) throw new HttpException('Data not found', 404);
    return this.navbarService.getHeaderById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('header/:id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: HeaderDto })
  async updateHeader(@Param('id') id: string, @Body() headerDto: HeaderDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findHeader = await this.navbarService.getHeaderById(id);
    if (!findHeader) throw new HttpException('Data not found', 404);
    const data = await this.navbarService.updateHeader(id, headerDto);
    return {
      message: 'Updated Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('header/:id')
  @UsePipes(new ValidationPipe())
  async deleteHeader(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findHeader = await this.navbarService.getHeaderById(id);
    if (!findHeader) throw new HttpException('Data not found', 404);
    await this.navbarService.deleteHeader(id);
    return {
      message: 'Deleted Successfully',
    };
  }

  @Get('navbar')
  @UsePipes(new ValidationPipe())
  async getNavbar() {
    return this.navbarService.getNavbar();
  }

  @UseGuards(AuthGuard)
  @Post('navbar')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: NavbarDto })
  async createNavbar(@Body() navbarDto: NavbarDto) {
    const data = await this.navbarService.createNavbar(navbarDto);
    return {
      message: 'Created Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Get('navbar/:id')
  @UsePipes(new ValidationPipe())
  async getNavbarById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findNavbar = await this.navbarService.getNavbarById(id);
    if (!findNavbar) throw new HttpException('Data not found', 404);
    return this.navbarService.getNavbarById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('navbar/:id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: NavbarDto })
  async updateNavbar(@Param('id') id: string, @Body() navbarDto: NavbarDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findNavbar = await this.navbarService.getNavbarById(id);
    if (!findNavbar) throw new HttpException('Data not found', 404);
    const data = await this.navbarService.updateNavbar(id, navbarDto);
    return {
      message: 'Updated Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('navbar/:id')
  @UsePipes(new ValidationPipe())
  async deleteNavbar(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findNavbar = await this.navbarService.getNavbarById(id);
    if (!findNavbar) throw new HttpException('Data not found', 404);
    await this.navbarService.deleteNavbar(id);
    return {
      message: 'Deleted Successfully',
    };
  }

  @Get('footer')
  @UsePipes(new ValidationPipe())
  async getFooter() {
    return this.navbarService.getFooter();
  }

  @UseGuards(AuthGuard)
  @Post('footer')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: FooterDto })
  async createFooter(@Body() footerDto: FooterDto) {
    const data = await this.navbarService.createFooter(footerDto);
    return {
      message: 'Created Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Get('footer/:id')
  @UsePipes(new ValidationPipe())
  async getFooterById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findFooter = await this.navbarService.getFooterById(id);
    if (!findFooter) throw new HttpException('Data not found', 404);
    return this.navbarService.getFooterById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('footer/:id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: FooterDto })
  async updateFooter(@Param('id') id: string, @Body() footerDto: FooterDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findFooter = await this.navbarService.getFooterById(id);
    if (!findFooter) throw new HttpException('Data not found', 404);
    const data = await this.navbarService.updateFooter(id, footerDto);
    return {
      message: 'Updated Successfully',
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('footer/:id')
  @UsePipes(new ValidationPipe())
  async deleteFooter(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const findFooter = await this.navbarService.getFooterById(id);
    if (!findFooter) throw new HttpException('Data not found', 404);
    await this.navbarService.deleteFooter(id);
    return {
      message: 'Deleted Successfully',
    };
  }
}
