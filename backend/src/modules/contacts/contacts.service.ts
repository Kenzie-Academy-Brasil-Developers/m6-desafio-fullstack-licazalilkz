import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/database/prisma.service';
import { Contact } from './entities/contact.entity';
import { plainToInstance } from 'class-transformer';

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
        name: contact.name,
        phone: contact.phone,
        clientId,
      },
    });
    return newContact;
  }

  async findAll(): Promise<Contact[]> {
    return await this.prisma.contact.findMany();
  }

  async findOne(contactId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { contactId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async update(contactId: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({
      where: { contactId },
    });
    if (!contact) {
      throw new NotFoundException('Contact not registered');
    }
    const updateContact = await this.prisma.contact.update({
      where: { contactId },
      data: { ...updateContactDto },
    });
    return plainToInstance(Contact, updateContact);
  }

  async remove(contactId: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { contactId },
    });
    if (!contact) {
      throw new NotFoundException('Contact doesnt exists');
    }
    await this.prisma.contact.delete({ where: { contactId } });
    return plainToInstance(Contact, contact);
  }
}
