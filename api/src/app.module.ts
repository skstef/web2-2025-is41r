import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';

@Module({
  imports: [ProductsModule, SuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
