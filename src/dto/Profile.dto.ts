import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  profilePictureId: string;

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
}
