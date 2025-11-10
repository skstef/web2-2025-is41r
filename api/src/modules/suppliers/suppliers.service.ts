import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/supplier.create.dto';
import { UpdateSupplierDto } from './dto/supplier.update.dto';
import { DealsService } from '../deals/deals.service';
import { ProductsService } from '../products/products.service';

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

@Injectable()
export class SuppliersService {
  constructor(
    private readonly dealsService: DealsService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  private suppliers: Supplier[] = [
    {
      id: 'f5cc5fd9-0e86-48b9-b484-382c8d9b1d8b',
      name: 'Global Supplies Ltd',
      email: 'info@globalsupplies.com',
      phone: '+1987654321',
      address: '456 Supply Rd',
    },
    {
      id: 'c3fbcbdc-34d0-4941-9c27-a6c84489ab2b',
      name: 'China Manufacturing Co.',
      email: 'info@china-mac.cn',
      phone: '+1123456987',
      address: 'Mao Avenue 7',
    },
  ];

  findAll(): Supplier[] {
    return this.suppliers;
  }

  findOne(id: string): Supplier {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier)
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    return supplier;
  }

  create(createSupplierDto: CreateSupplierDto): Supplier {
    const newSupplier: Supplier = {
      id: crypto.randomUUID(),
      ...createSupplierDto,
    };
    this.suppliers.push(newSupplier);
    return newSupplier;
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto): Supplier {
    const supplier = this.findOne(id);
    Object.assign(supplier, updateSupplierDto);
    return supplier;
  }

  remove(id: string): { message: string } {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1)
      throw new NotFoundException(
        `Cannot delete supplier: Supplier with ID ${id} not found`,
      );

    // Check if any product uses this supplier
    const productInUse = this.productsService
      .findAll()
      .some((p) => p.supplierId === id);

    if (productInUse) {
      throw new BadRequestException(
        'Cannot delete supplier: products are linked',
      );
    }

    // Check if any deal uses a product from this supplier
    const productIds = this.productsService
      .findAll()
      .filter((p) => p.supplierId === id)
      .map((p) => p.id);
    const dealInUse = productIds.some((pid) =>
      this.dealsService.hasDealsWithProduct(pid),
    );
    if (dealInUse) {
      throw new BadRequestException(
        'Cannot delete supplier: deals are linked via products',
      );
    }

    const idx = this.suppliers.findIndex((s) => s.id === id);
    this.suppliers.splice(idx, 1);
    return { message: 'Supplier deleted' };
  }
}
