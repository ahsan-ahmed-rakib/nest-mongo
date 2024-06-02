import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const saveNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find().populate('settings');
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
