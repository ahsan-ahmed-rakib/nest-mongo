import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ContactDto } from 'src/dto/Contact.dto';
import { ContactService } from './contact.service';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  async getContact() {
    return this.contactService.getContact();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ContactDto })
  async createContact(@Body() contactDto: ContactDto) {
    const data = await this.contactService.createContact(contactDto);
    return { message: 'Mail Sent Successfully', data: data };
  }

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return this.contactService.getContactById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: ContactDto })
  async updateContact(@Param('id') id: string, @Body() contactDto: ContactDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const contact = await this.contactService.getContactById(id);
    if (!contact) throw new HttpException('Contact not found', 404);
    const data = await this.contactService.updateContact(id, contactDto);
    return { message: 'Updated Successfully', data: data };
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const contact = await this.contactService.getContactById(id);
    if (!contact) throw new HttpException('Contact not found', 404);
    await this.contactService.deleteContact(id);
    return { message: 'Deleted Successfully', id: id };
  }
}
