import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Social {
  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  iconPack: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  hoverColor: string;

  @Prop({ required: true, unique: true })
  priority: number;
}

export const SocialSchema = SchemaFactory.createForClass(Social);
