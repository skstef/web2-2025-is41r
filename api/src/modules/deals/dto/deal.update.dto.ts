import { PartialType } from '@nestjs/mapped-types';
import { CreateDealDto } from './deal.create.dto';

export class UpdateDealDto extends PartialType(CreateDealDto) {}
