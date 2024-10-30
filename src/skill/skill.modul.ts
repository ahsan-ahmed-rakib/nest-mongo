import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema, Tech, TechSchema } from '../schema/Skill.schema';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema },
      { name: Tech.name, schema: TechSchema },
    ]),
  ],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
