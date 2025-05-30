import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { PortfolioTextsModule } from './portfolio-texts/portfolio-texts.module';
import { ProfileModule } from './profile/profile.module';
import { SocialsModule } from './socials/socials.module';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    ProfileModule,
    SocialsModule,
    PortfolioTextsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ credentials: true })).forRoutes('*');
  }
}
