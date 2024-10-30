import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Footer,
  FooterSchema,
  Header,
  HeaderSchema,
  Navbar,
  NavbarSchema,
} from 'src/schema/Navbar.schema';
import { NavbarController } from './navbar.controller';
import { NavbarService } from './navbar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Header.name, schema: HeaderSchema },
      { name: Navbar.name, schema: NavbarSchema },
      { name: Footer.name, schema: FooterSchema },
    ]),
  ],
  providers: [NavbarService],
  controllers: [NavbarController],
})
export class NavbarModule {}
