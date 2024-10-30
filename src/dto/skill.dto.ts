import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class SkillDto {
  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload',
    required: true,
  })
  file: any;

  @ApiProperty({ required: false })
  imageId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class TechDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;
}
