import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from 'src/schema/Home.schema';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
