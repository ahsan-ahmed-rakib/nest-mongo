import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Header {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  desigantion: string;
}

export const HeaderSchema = SchemaFactory.createForClass(Header);

@Schema()
export class Navbar {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  link: string;
}

export const NavbarSchema = SchemaFactory.createForClass(Navbar);

@Schema()
export class Footer {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  value: string;
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
