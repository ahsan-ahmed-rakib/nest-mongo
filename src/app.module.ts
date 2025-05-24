import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { ResumeModule } from './resume/resume.module';
import { SkillModule } from './skill/skill.modul';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    HomeModule,
    SkillModule,
    NavbarModule,
    ProjectModule,
    ResumeModule,
    ContactModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ credentials: true })).forRoutes('*');
  }
}
