import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
