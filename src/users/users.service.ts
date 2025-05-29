import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { User } from 'src/schema/User.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({
      email,
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    return await user.save();
  }

  getAllUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword; // Replace with the hashed password
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  } 

  async deleteUser(id: string) {
    const userCount = await this.userModel.countDocuments();

    if (userCount <= 1) {
      throw new HttpException('Can not delete the only existing user', 400);
    }
    return this.userModel.findByIdAndDelete(id);
  }
}
