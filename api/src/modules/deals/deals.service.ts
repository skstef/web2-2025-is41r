// src/deals/deals.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateDealDto } from './dto/deal.create.dto';
import { UpdateDealDto } from './dto/deal.update.dto';
import { ProductsService } from '../products/products.service';
import { ClientsService } from '../clients/clients.service';

export interface Deal {
  id: string;
  title: string;
  clientId: string;
  productId: string;
  amount: number;
  status: string;
  createdAt: string;
}

@Injectable()
export class DealsService {
  private deals: Deal[] = [
    {
      id: '816d34f0-fdea-49b6-a9ae-57cb35a060f8',
      title: 'Laptop Sale',
      clientId: '53e018bc-4523-46cd-8d47-3831cf4b938e',
      productId: '164b834f-2c85-4ef6-88b9-25362b9401de',
      amount: 500,
      status: 'sent',
      createdAt: '2025-11-10T23:30:54.193Z',
    },
    {
      id: '372f7988-09fc-4d2c-ab9f-383147b8d67e',
      title: 'Mouse Sale',
      clientId: '53e018bc-4523-46cd-8d47-3831cf4b938e',
      productId: '68edb317-894d-4f81-9661-da81bf4851b9',
      amount: 500,
      status: 'arrived',
      createdAt: '2025-11-10T23:31:27.139Z',
    },
  ];

  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,

    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
  ) {}

  findAll(): Deal[] {
    return this.deals;
  }

  findOne(id: string): Deal {
    const deal = this.deals.find((d) => d.id === id);
    if (!deal) throw new NotFoundException(`Deal #${id} not found`);
    return deal;
  }

  create(dto: CreateDealDto): Deal {
    this.validateClientAndProduct(dto.clientId, dto.productId);
    const newDeal: Deal = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date().toISOString(),
    };
    this.deals.push(newDeal);
    return newDeal;
  }

  update(id: string, dto: UpdateDealDto): Deal {
    const deal = this.findOne(id);
    if (dto.clientId || dto.productId) {
      this.validateClientAndProduct(
        dto.clientId || deal.clientId,
        dto.productId || deal.productId,
      );
    }
    Object.assign(deal, dto);
    return deal;
  }

  remove(id: string): { message: string } {
    const idx = this.deals.findIndex((d) => d.id === id);
    if (idx === -1) throw new NotFoundException(`Deal #${id} not found`);
    this.deals.splice(idx, 1);
    return { message: 'Deal deleted' };
  }

  // --- Block deletion of Supplier/Client if deals exist ---
  hasDealsWithClient(clientId: string): boolean {
    return this.deals.some((d) => d.clientId === clientId);
  }

  hasDealsWithProduct(productId: string): boolean {
    return this.deals.some((d) => d.productId === productId);
  }

  private validateClientAndProduct(clientId: string, productId: string) {
    try {
      this.clientsService.findOne(clientId);
    } catch {
      throw new BadRequestException(
        `Client with ID ${clientId} does not exist`,
      );
    }
    try {
      this.productsService.findOne(productId);
    } catch {
      throw new BadRequestException(
        `Product with ID ${productId} does not exist`,
      );
    }
  }
}
