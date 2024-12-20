import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/Login.dto';
import { RefreshToken } from 'src/schema/RefreshToken.schema';
import { User } from 'src/schema/User.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
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
}
