import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealDto } from './dto/deal.create.dto';
import { UpdateDealDto } from './dto/deal.update.dto';

export interface Deal {
  id: string;
  title: string;
  clientId: string;
  productIds: string[];
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
}

@Injectable()
export class DealsService {
  private deals: Deal[] = [
    {
      id: 'd1',
      title: 'First Deal',
      clientId: 'c1',
      productIds: ['1', '2'],
      amount: 9_999,
      status: 'sent',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Deal[] {
    return this.deals;
  }

  findOne(id: string): Deal {
    const deal = this.deals.find((d) => d.id === id);
    if (!deal) throw new NotFoundException(`Deal #${id} not found`);
    return deal;
  }

  create(dto: CreateDealDto): Deal {
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
    Object.assign(deal, dto);
    return deal;
  }

  remove(id: string): { message: string } {
    const idx = this.deals.findIndex((d) => d.id === id);
    if (idx === -1) throw new NotFoundException(`Deal #${id} not found`);
    this.deals.splice(idx, 1);
    return { message: 'Deal deleted' };
  }
}
