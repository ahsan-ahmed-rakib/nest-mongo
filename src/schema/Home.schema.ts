import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Home {
  @Prop({ required: false })
  profilePicture: string;
  @Prop({ required: false })
  name: string;
  @Prop({ required: false })
  designation: string;
  @Prop({ required: false })
  bioHeadings: string;
  @Prop({ required: false })
  bioTitle: string;
  @Prop({ required: false })
  bioDetails: string;
  @Prop({ required: false })
  gitHub: string;
  @Prop({ required: false })
  facebook: string;
  @Prop({ required: false })
  linkedIn: string;
  @Prop({ required: false })
  instagram: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
