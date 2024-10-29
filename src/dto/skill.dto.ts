import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class SkillDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  imageId: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
