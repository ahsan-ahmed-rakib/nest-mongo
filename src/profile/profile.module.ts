import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from 'src/common/image/image.service';
import { Profile, ProfileSchema } from 'src/schema/Profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService, ImageService],
  controllers: [ProfileController],
})
export class ProfileModule {}
