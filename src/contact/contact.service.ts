import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/schema/Contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async createContact(data: Contact): Promise<Contact> {
    const contact = new this.contactModel(data);
    return contact.save();
  }

  async getContact(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async getContactById(id: string): Promise<Contact> {
    return this.contactModel.findById(id).exec();
  }

  async updateContact(id: string, data: Contact): Promise<Contact> {
    return this.contactModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteContact(id: string) {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
