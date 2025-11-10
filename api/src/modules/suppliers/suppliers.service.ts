import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/supplier.create.dto';
import { UpdateSupplierDto } from './dto/supplier.update.dto';

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

@Injectable()
export class SuppliersService {
  private suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Global Supplies Ltd',
      email: 'info@globalsupplies.com',
      phone: '+1987654321',
      address: '456 Supply Rd',
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
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    this.suppliers.splice(index, 1);
    return { message: 'Supplier deleted successfully' };
  }
}
