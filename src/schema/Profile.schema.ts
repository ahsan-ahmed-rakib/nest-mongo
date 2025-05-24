import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  profilePictureId: string;

  @Prop({ required: false })
  profilePicture: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  cvUrl: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
