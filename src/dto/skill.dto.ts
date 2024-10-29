import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class SkillDataDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  imageId: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}

export class TechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDataDto)
  data: SkillDataDto[];
}
