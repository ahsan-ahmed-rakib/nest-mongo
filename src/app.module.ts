import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { SkillModule } from './skill/skill.modul';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-mongo'),
    UsersModule,
    HomeModule,
    SkillModule
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
