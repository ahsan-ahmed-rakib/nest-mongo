import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './home/home.module';
import { ImageModule } from './image.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-mongo'),
    UsersModule,
    HomeModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
