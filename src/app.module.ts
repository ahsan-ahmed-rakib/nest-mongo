import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.modul';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    HomeModule,
    SkillModule,
    NavbarModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ credentials: true })).forRoutes('*');
  }
}
