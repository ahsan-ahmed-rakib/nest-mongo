import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { LoginDto } from 'src/dto/Login.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RefreshTokenDto } from './../dto/RefreshToken.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.createUser(createUserDto);
    return { message: 'Created Successfully', data: data };
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return { message: 'Updated Successfully', data: updatedUser };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return { message: 'Deleted Successfully' };
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.loginUser(loginDto);
    // return { message: 'Login Successfully', data: data };
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.usersService.refreshTokens(refreshTokenDto.refreshToken);
  }
}
