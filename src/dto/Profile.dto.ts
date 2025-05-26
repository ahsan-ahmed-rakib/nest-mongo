import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to upload',
    required: true,
  })
  file: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  designation: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ required: true })
  cvUrl: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  updatedAt: Date;
}
