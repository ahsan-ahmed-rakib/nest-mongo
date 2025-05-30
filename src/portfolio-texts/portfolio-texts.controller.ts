import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PortfolioTextDto } from 'src/dto/PortfolioText.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PortfolioTextsService } from './portfolio-texts.service';

@ApiTags('portfolio-texts')
@Controller('portfolio-texts')
export class PortfolioTextsController {
  constructor(private textService: PortfolioTextsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: PortfolioTextDto })
  @Post()
  async createText(@Body() text: PortfolioTextDto) {
    const data = await this.textService.createText(text);
    return {
      message: 'Created Successfully',
      data,
    };
  }

  @Get()
  async getAllTexts() {
    return this.textService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTextById(@Param('id') id: string) {
    return await this.textService.getSingleText(id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: PortfolioTextDto })
  @Put(':id')
  async updateText(@Param('id') id: string, @Body() text: PortfolioTextDto) {
    const data = await this.textService.updateText(id, text);
    return {
      message: 'Updated Successfully',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteText(@Param('id') id: string) {
    const data = await this.textService.deleteText(id);
    return {
      message: 'Deleted Successfully',
      id: id,
    };
  }
}
