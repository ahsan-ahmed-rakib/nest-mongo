import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/Login.dto';
import { RefreshTokenDto } from 'src/dto/RefreshToken.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
    // return { message: 'Login Successfully', data: data };
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }
}
