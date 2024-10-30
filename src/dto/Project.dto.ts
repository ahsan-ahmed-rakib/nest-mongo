import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

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
}

