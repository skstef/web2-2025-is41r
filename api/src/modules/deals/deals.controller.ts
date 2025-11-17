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
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/deal.create.dto';
import { UpdateDealDto } from './dto/deal.update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Deal } from './deal.entity';

@ApiTags('Deals')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  @ApiOperation({ summary: 'List all deals' })
  @ApiResponse({ status: 200 })
  async getAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deal by ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Deal not found' })
  async getById(@Param('id') id: string): Promise<Deal> {
    return this.dealsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new deal' })
  @ApiResponse({ status: 201 })
  async create(@Body() dto: CreateDealDto): Promise<Deal> {
    return this.dealsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Fully update deal' })
  @ApiResponse({ status: 200 })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDealDto,
  ): Promise<Deal> {
    return this.dealsService.update(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update deal' })
  @ApiResponse({ status: 200 })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateDealDto,
  ): Promise<Deal> {
    return this.dealsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete deal' })
  @ApiResponse({ status: 200, description: 'Deal deleted' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.dealsService.remove(id);
  }
}
