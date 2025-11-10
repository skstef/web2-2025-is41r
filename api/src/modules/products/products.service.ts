import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/product.create.dto';
import { UpdateProductDto } from './dto/product.update.dto';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: '1', name: 'Sample Product', price: 100 },
    { id: '2', name: 'Another Product', price: 150 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: string): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1)
      throw new NotFoundException(`Product with ID ${id} not found`);
    this.products.splice(index, 1);
    return { message: 'Product deleted successfully' };
  }
}
