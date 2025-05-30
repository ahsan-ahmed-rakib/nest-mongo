import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioText,
  PortfolioTextSchema,
} from 'src/schema/PortfolioText.schema';
import { PortfolioTextsController } from './portfolio-texts.controller';
import { PortfolioTextsService } from './portfolio-texts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioText.name, schema: PortfolioTextSchema },
    ]),
  ],
  providers: [PortfolioTextsService],
  controllers: [PortfolioTextsController],
})
export class PortfolioTextsModule {}
