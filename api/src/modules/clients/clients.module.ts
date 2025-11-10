import { forwardRef, Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [forwardRef(() => DealsModule)],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
