import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { HomeModule } from './home/home.module';
import { SkillModule } from './skill/skill.modul';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    HomeModule,
    SkillModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({ origin: 'http://localhost:5000', credentials: true }))
      .forRoutes('*');
  }
}
