import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { RefreshToken } from 'src/schema/RefreshToken.schema';
import { User } from 'src/schema/User.schema';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './../dto/Login.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

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

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const data = await this.generateUserTokens(user._id);
    return {
      message: 'Login Successfully',
      data: { ...data, userId: user._id },
    };
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date().toISOString() },
    });

    if (!token) throw new UnauthorizedException('Invalid Token');

    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: string) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const expiryDate = date.toISOString();
    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { token, expiryDate } },
      { upsert: true },
    );
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
