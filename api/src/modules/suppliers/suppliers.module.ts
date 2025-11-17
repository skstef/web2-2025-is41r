import { Module, forwardRef } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { DealsModule } from '../deals/deals.module';
import { Supplier } from './supplier.entity';
import { SuppliersController } from './suppliers.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier]),
    forwardRef(() => ProductsModule),
    forwardRef(() => DealsModule),
  ],
  providers: [SuppliersService],
  exports: [SuppliersService],
  controllers: [SuppliersController],
})
export class SuppliersModule {}
