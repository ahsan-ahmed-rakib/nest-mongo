import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: false })
  image: string;
  @Prop({ required: false })
  imageId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
