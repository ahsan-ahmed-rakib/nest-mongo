import { IsOptional, IsString, IsUrl } from 'class-validator';

export class HomeDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  profilePicture: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsOptional()
  @IsString()
  bioHeadings: string;

  @IsOptional()
  @IsString()
  bioTitle: string;

  @IsOptional()
  @IsString()
  bioDetails: string;

  @IsOptional()
  @IsUrl()
  gitHub?: string;

  @IsOptional()
  @IsUrl()
  facebook?: string;

  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;
}
