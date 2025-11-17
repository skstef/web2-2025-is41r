import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealsService } from '../deals/deals.service';
import { ProductsService } from '../products/products.service';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/supplier.create.dto';
import { UpdateSupplierDto } from './dto/supplier.update.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepo: Repository<Supplier>,

    @Inject(forwardRef(() => DealsService))
    private readonly dealsService: DealsService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepo.find();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.suppliersRepo.findOneBy({ id });
    if (!supplier)
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    return supplier;
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.suppliersRepo.create(dto as Partial<Supplier>);
    return this.suppliersRepo.save(supplier);
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, dto);
    return this.suppliersRepo.save(supplier);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // will throw if not exists

    // Check if any product uses this supplier
    const productInUse = await this.productsService
      .findAll()
      .then((products) => products.some((p) => p.supplierId === id));

    if (productInUse) {
      throw new BadRequestException(
        'Cannot delete supplier: products are linked',
      );
    }

    // Check if any deal uses a product from this supplier
    const productIds = (await this.productsService.findAll())
      .filter((p) => p.supplierId === id)
      .map((p) => p.id);

    const dealInUse = await Promise.all(
      productIds.map((pid) => this.dealsService.hasDealsWithProduct(pid)),
    ).then((arr) => arr.some(Boolean));

    if (dealInUse) {
      throw new BadRequestException(
        'Cannot delete supplier: deals are linked via products',
      );
    }

    const res = await this.suppliersRepo.delete({ id });
    if (res.affected === 0) {
      throw new NotFoundException(
        `Cannot delete supplier: Supplier with ID ${id} not found`,
      );
    }

    return { message: 'Supplier deleted' };
  }
}
