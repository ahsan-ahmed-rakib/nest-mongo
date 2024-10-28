import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './Home/home.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-mongo'),
    UsersModule,
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
