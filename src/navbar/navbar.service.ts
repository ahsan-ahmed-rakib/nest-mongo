import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FooterDto, HeaderDto, NavbarDto } from 'src/dto/Navbar.dto';
import { Footer, Header, Navbar } from 'src/schema/Navbar.schema';

@Injectable()
export class NavbarService {
  constructor(
    @InjectModel(Header.name) private headerModel: Model<Header>,
    @InjectModel(Navbar.name) private navbarModel: Model<Navbar>,
    @InjectModel(Footer.name) private footerModel: Model<Footer>,
  ) {}

  async getHeader() {
    return this.headerModel.find();
  }

  async getNavbar() {
    return this.navbarModel.find();
  }

  async getFooter() {
    return this.footerModel.find();
  }

  async getHeaderById(id: string) {
    return this.headerModel.findById(id);
  }

  async getNavbarById(id: string) {
    return this.navbarModel.findById(id);
  }

  async getFooterById(id: string) {
    return this.footerModel.findById(id);
  }

  async createHeader(headerDto: HeaderDto) {
    return new this.headerModel(headerDto).save();
  }

  async createNavbar(navbarDto: NavbarDto) {
    return new this.navbarModel(navbarDto).save();
  }

  async createFooter(footerDto: FooterDto) {
    return new this.footerModel(footerDto).save();
  }

  async updateHeader(id: string, headerDto: HeaderDto) {
    return this.headerModel.findByIdAndUpdate(id, headerDto, { new: true });
  }

  async updateNavbar(id: string, navbarDto: NavbarDto) {
    return this.navbarModel.findByIdAndUpdate(id, navbarDto, { new: true });
  }

  async updateFooter(id: string, footerDto: FooterDto) {
    return this.footerModel.findByIdAndUpdate(id, footerDto, { new: true });
  }

  async deleteHeader(id: string) {
    return this.headerModel.findByIdAndDelete(id);
  }

  async deleteNavbar(id: string) {
    return this.navbarModel.findByIdAndDelete(id);
  }

  async deleteFooter(id: string) {
    return this.footerModel.findByIdAndDelete(id);
  }
}
