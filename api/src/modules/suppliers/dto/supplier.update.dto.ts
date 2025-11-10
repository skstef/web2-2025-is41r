import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './supplier.create.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
