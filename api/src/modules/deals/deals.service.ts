import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { ClientsService } from '../clients/clients.service';
import { Deal } from './deal.entity';
import { CreateDealDto } from './dto/deal.create.dto';
import { UpdateDealDto } from './dto/deal.update.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealsRepo: Repository<Deal>,

    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,

    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
  ) {}

  async findAll(): Promise<Deal[]> {
    return this.dealsRepo.find();
  }

  async findOne(id: string): Promise<Deal> {
    const deal = await this.dealsRepo.findOneBy({ id });
    if (!deal) throw new NotFoundException(`Deal #${id} not found`);
    return deal;
  }

  async create(dto: CreateDealDto): Promise<Deal> {
    await this.validateClientAndProduct(dto.clientId, dto.productId);

    const newDeal = this.dealsRepo.create({
      ...dto,
    } as Partial<Deal>);

    return this.dealsRepo.save(newDeal);
  }

  async update(id: string, dto: UpdateDealDto): Promise<Deal> {
    const deal = await this.findOne(id);

    const clientId = dto.clientId ?? deal.clientId;
    const productId = dto.productId ?? deal.productId;

    if (dto.clientId || dto.productId) {
      await this.validateClientAndProduct(clientId, productId);
    }

    Object.assign(deal, dto);
    return this.dealsRepo.save(deal);
  }

  async remove(id: string): Promise<{ message: string }> {
    const res = await this.dealsRepo.delete({ id });
    if (res.affected === 0)
      throw new NotFoundException(`Deal #${id} not found`);
    return { message: 'Deal deleted' };
  }

  // used by other services:
  async hasDealsWithClient(clientId: string): Promise<boolean> {
    const count = await this.dealsRepo.count({ where: { clientId } });
    return count > 0;
  }

  async hasDealsWithProduct(productId: string): Promise<boolean> {
    const count = await this.dealsRepo.count({ where: { productId } });
    return count > 0;
  }

  private async validateClientAndProduct(clientId: string, productId: string) {
    try {
      await this.clientsService.findOne(clientId);
    } catch {
      throw new BadRequestException(
        `Client with ID ${clientId} does not exist`,
      );
    }
    try {
      await this.productsService.findOne(productId);
    } catch {
      throw new BadRequestException(
        `Product with ID ${productId} does not exist`,
      );
    }
  }
}
