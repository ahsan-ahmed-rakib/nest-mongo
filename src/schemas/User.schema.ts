import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (password: string) => password.length >= 8,
      message: 'Password must be at least 8 characters long.',
    },
  })
  password: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
