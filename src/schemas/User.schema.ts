import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
