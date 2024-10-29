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

@Schema()
export class TechnicalSkill {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  data: Skill;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
export const TechnicalSkillSchema =
  SchemaFactory.createForClass(TechnicalSkill);
