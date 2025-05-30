import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class PortfolioText {
  @Prop({ required: true })
  text: string;
}

export const PortfolioTextSchema = SchemaFactory.createForClass(PortfolioText);
