import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class HomeDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  profilePicture: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload',
    required: true,
  })
  file: any;

  @ApiProperty({ required: false })
  profileId: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  designation: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  bioHeadings: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  bioTitle: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  bioDetails: string;

  @ApiProperty({ required: true })
  @IsOptional()
  gitHub?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  facebook?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  linkedIn?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  instagram?: string;
}
