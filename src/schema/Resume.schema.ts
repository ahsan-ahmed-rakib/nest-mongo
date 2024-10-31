import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Resume {
  @Prop({ required: true })
  timeline: string;
  @Prop({ required: false })
  designation: string;
  @Prop({ required: false })
  educationTitle: string;
  @Prop({ required: true })
  institueName: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  experienceType: number;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
