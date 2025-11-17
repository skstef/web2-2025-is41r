import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DealsModule } from './modules/deals/deals.module';
import { Client } from './modules/clients/client.entity';
import { Deal } from './modules/deals/deal.entity';
import { Product } from './modules/products/product.entity';
import { Supplier } from './modules/suppliers/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'appdb',
      entities: [Client, Deal, Product, Supplier],
      synchronize: true, // set false in production and use migrations
      logging: false,
    }),
    ProductsModule,
    SuppliersModule,
    ClientsModule,
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
