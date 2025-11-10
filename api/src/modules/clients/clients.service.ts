import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/client.create.dto';
import { UpdateClientDto } from './dto/client.update.dto';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
}

@Injectable()
export class ClientsService {
  private clients: Client[] = [
    {
      id: 'c1',
      name: 'Beta Ltd',
      email: 'beta@example.com',
      phone: '+1987654321',
      address: '456 Beta Ave',
      company: 'Beta Industries',
    },
  ];

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: string): Client {
    const client = this.clients.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client #${id} not found`);
    return client;
  }

  create(dto: CreateClientDto): Client {
    const newClient: Client = { id: crypto.randomUUID(), ...dto };
    this.clients.push(newClient);
    return newClient;
  }

  update(id: string, dto: UpdateClientDto): Client {
    const client = this.findOne(id);
    Object.assign(client, dto);
    return client;
  }

  remove(id: string): { message: string } {
    const idx = this.clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException(`Client #${id} not found`);
    this.clients.splice(idx, 1);
    return { message: 'Client deleted' };
  }
}
