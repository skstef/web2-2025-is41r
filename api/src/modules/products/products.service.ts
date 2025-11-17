import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliersService } from '../suppliers/suppliers.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.create.dto';
import { UpdateProductDto } from './dto/product.update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,

    @Inject(forwardRef(() => SuppliersService))
    private readonly suppliersService: SuppliersService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    await this.validateSupplierExists(dto.supplierId);
    const product = this.productsRepo.create({ ...dto });
    return this.productsRepo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (dto.supplierId) {
      await this.validateSupplierExists(dto.supplierId);
    }
    Object.assign(product, dto);
    return this.productsRepo.save(product);
  }

  async remove(id: string): Promise<{ message: string }> {
    // check deals via repository count (if you want constraint)
    const res = await this.productsRepo.delete({ id });
    if (res.affected === 0)
      throw new NotFoundException(`Product #${id} not found`);
    return { message: 'Product deleted' };
  }

  private async validateSupplierExists(supplierId: string) {
    try {
      await this.suppliersService.findOne(supplierId);
    } catch {
      throw new BadRequestException(
        `Supplier with ID ${supplierId} does not exist`,
      );
    }
  }
}
