import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { DealsService, type Deal } from './deals.service';
import { CreateDealDto } from './dto/deal.create.dto';
import { UpdateDealDto } from './dto/deal.update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Deals')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  @ApiOperation({ summary: 'List all deals' })
  @ApiResponse({ status: 200 })
  getAll(): Deal[] {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deal by id' })
  @ApiResponse({ status: 200 })
  getOne(@Param('id') id: string): Deal {
    return this.dealsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a deal' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateDealDto): Deal {
    return this.dealsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Full update' })
  @ApiResponse({ status: 200 })
  update(@Param('id') id: string, @Body() dto: UpdateDealDto): Deal {
    return this.dealsService.update(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partial update' })
  @ApiResponse({ status: 200 })
  patch(@Param('id') id: string, @Body() dto: UpdateDealDto): Deal {
    return this.dealsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete deal' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  remove(@Param('id') id: string) {
    return this.dealsService.remove(id);
  }
}
