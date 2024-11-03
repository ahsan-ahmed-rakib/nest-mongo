import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResumeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  timeline: string;

  @ApiProperty({ required: false })
  @IsString()
  designation: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  educationTitle: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  institueName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  experienceType: number;
}

export class ProfessionalSkillDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class LanguageDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class PersonalSkillDto {
  @ApiProperty({ required: true })
  @IsArray()
  professionalSkills: ProfessionalSkillDto[];

  @ApiProperty({ required: true })
  @IsArray()
  languages: LanguageDto[];
}
