import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/database/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    const foundClient = await this.prisma.client.findFirst({
      where: { email: createClientDto.email },
    });
    if (foundClient) {
      throw new ConflictException('Email already exists !');
    }
    const client = new Client();
    Object.assign(client, createClientDto);
    await this.prisma.client.create({ data: { ...client } });
    return plainToInstance(Client, client);
  }

  async findAll() {
    const client = await this.prisma.client.findMany();
    return plainToInstance(Client, client);
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('User doesnt exists');
    }
    return plainToInstance(Client, client);
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { email } });
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('User doesnt exists');
    }
    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: { ...updateClientDto },
    });
    return plainToInstance(Client, updatedClient);
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('User doesnt exists');
    }
    await this.prisma.client.delete({ where: { id } });
    return plainToInstance(Client, client);
  }
}
