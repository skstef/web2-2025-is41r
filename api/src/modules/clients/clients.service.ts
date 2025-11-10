import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/client.create.dto';
import { UpdateClientDto } from './dto/client.update.dto';
import { DealsService } from '../deals/deals.service';

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
  constructor(
    @Inject(forwardRef(() => DealsService))
    private readonly dealsService: DealsService,
  ) {}

  private clients: Client[] = [
    {
      id: '53e018bc-4523-46cd-8d47-3831cf4b938e',
      name: 'Atehno MD',
      email: 'atehno@gmail.com',
      phone: '+37367123456',
      address: 'str. Stefan Cel Mare 1',
      company: 'S.R.L. A TEHNO DISTRIBUTIE',
    },
    {
      id: 'c02f094d-e399-4514-8785-9256499dcf56',
      name: 'Darwin',
      email: 'darwin@gmail.com',
      phone: '+37367123456',
      address: 'str. Stefan Cel Mare 37',
      company: 'ULTRACOM ELECTRONIC S.R.L.',
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
    if (this.dealsService.hasDealsWithClient(id)) {
      throw new BadRequestException(
        'Cannot delete client: has associated deals',
      );
    }

    const idx = this.clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException(`Client #${id} not found`);
    this.clients.splice(idx, 1);
    return { message: 'Client deleted' };
  }
}
