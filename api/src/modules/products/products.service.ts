// src/products/products.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/product.create.dto';
import { UpdateProductDto } from './dto/product.update.dto';
import { SuppliersService } from '../suppliers/suppliers.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  supplierId: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '164b834f-2c85-4ef6-88b9-25362b9401de',
      name: 'Laptop',
      price: 999,
      supplierId: 'f5cc5fd9-0e86-48b9-b484-382c8d9b1d8b',
    },
    {
      id: '68edb317-894d-4f81-9661-da81bf4851b9',
      name: 'Mouse',
      price: 25,
      supplierId: 'c3fbcbdc-34d0-4941-9c27-a6c84489ab2b',
    },
  ];

  constructor(private readonly suppliersService: SuppliersService) {}

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(dto: CreateProductDto): Product {
    this.validateSupplierExists(dto.supplierId);
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...dto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (dto.supplierId) {
      this.validateSupplierExists(dto.supplierId);
    }
    Object.assign(product, dto);
    return product;
  }

  remove(id: string): { message: string } {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException(`Product #${id} not found`);
    this.products.splice(idx, 1);
    return { message: 'Product deleted' };
  }

  private validateSupplierExists(supplierId: string) {
    try {
      this.suppliersService.findOne(supplierId);
    } catch {
      throw new BadRequestException(
        `Supplier with ID ${supplierId} does not exist`,
      );
    }
  }
}
