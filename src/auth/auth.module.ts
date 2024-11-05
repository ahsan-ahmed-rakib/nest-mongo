import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from 'src/schema/RefreshToken.schema';
import { User, UserSchema } from 'src/schema/User.schema';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
