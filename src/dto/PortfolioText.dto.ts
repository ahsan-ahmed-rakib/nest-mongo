import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PortfolioTextDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  text: string;
}
