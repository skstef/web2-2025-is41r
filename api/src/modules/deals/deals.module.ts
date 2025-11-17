import { Module, forwardRef } from '@nestjs/common';
import { DealsService } from './deals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { ClientsModule } from '../clients/clients.module';
import { Deal } from './deal.entity';
import { DealsController } from './deals.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal]),
    forwardRef(() => ProductsModule),
    forwardRef(() => ClientsModule),
  ],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
})
export class DealsModule {}
