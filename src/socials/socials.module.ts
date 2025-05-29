import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Social, SocialSchema } from 'src/schema/Social.schema';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Social.name, schema: SocialSchema }]),
  ],
  controllers: [SocialsController],
  providers: [SocialsService],
})
export class SocialsModule {}
