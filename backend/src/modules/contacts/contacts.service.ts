import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/database/prisma.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto, clientId: string) {
    const contact = Object.assign(new Contact(), createContactDto);
    const newContact = await this.prisma.contact.create({
      data: {
        contactId: contact.contactId,
        date: contact.date,
        email: contact.email,
        name: contact.email,
        phone: contact.phone,
        clientId,
      },
    });
    return newContact;
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(contactId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { contactId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: string) {
    return `This action removes a #${id} contact`;
  }
}
