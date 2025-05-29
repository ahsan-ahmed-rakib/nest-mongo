import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class SocialDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  icon: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  iconPack: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ required: true })
  link: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  hoverColor: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  priority: number;
}
