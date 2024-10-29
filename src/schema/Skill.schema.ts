import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop({ required: false })
  image: string;
  @Prop({ required: false })
  imageId: string;
  @Prop({ required: true })
  title: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema()
export class Tech {
  @Prop({ required: true })
  title: string;
}

export const TechSchema = SchemaFactory.createForClass(Tech);
