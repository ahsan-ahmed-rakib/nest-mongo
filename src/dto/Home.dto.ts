import { IsOptional, IsString, IsUrl } from 'class-validator';

export class HomeDto {
  @IsString()
  @IsUrl()
  profilePicture: string;

  @IsString()
  name: string;

  @IsString()
  designation: string;

  @IsString()
  bioHeadings: string;

  @IsString()
  bioTitle: string;

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
