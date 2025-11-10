import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DealsModule } from './modules/deals/deals.module';

@Module({
  imports: [ProductsModule, SuppliersModule, ClientsModule, DealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
