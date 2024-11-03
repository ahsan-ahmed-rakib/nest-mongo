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

export type PersonalSkillDocument = PersonalSkill & Document;

@Schema()
export class ProfessionalSkill {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const ProfessionalSkillSchema =
  SchemaFactory.createForClass(ProfessionalSkill);

@Schema()
export class Language {
  @Prop({ required: true })
  title: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

@Schema()
export class PersonalSkill {
  @Prop({ type: [ProfessionalSkillSchema], default: [] })
  professionalSkills: ProfessionalSkill[];

  @Prop({ type: [LanguageSchema], default: [] })
  languages: Language[];
}

export const PersonalSkillSchema = SchemaFactory.createForClass(PersonalSkill);
