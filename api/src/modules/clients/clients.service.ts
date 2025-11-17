import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DealsService } from '../deals/deals.service';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/client.create.dto';
import { UpdateClientDto } from './dto/client.update.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepo: Repository<Client>,

    @Inject(forwardRef(() => DealsService))
    private readonly dealsService: DealsService,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepo.find();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepo.findOneBy({ id });
    if (!client) throw new NotFoundException(`Client #${id} not found`);
    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    const newClient = this.clientsRepo.create(dto as Partial<Client>);
    return this.clientsRepo.save(newClient);
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientsRepo.save(client);
  }

  async remove(id: string): Promise<{ message: string }> {
    // Prevent delete if client has deals
    const hasDeals = await this.dealsService.hasDealsWithClient(id);
    if (hasDeals) {
      throw new BadRequestException(
        'Cannot delete client: has associated deals',
      );
    }

    const res = await this.clientsRepo.delete({ id });
    if (res.affected === 0) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return { message: 'Client deleted' };
  }
}
