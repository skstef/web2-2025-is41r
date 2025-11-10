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
import { ClientsService, type Client } from './clients.service';
import { CreateClientDto } from './dto/client.create.dto';
import { UpdateClientDto } from './dto/client.update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'List all clients' })
  @ApiResponse({ status: 200 })
  getAll(): Client[] {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by id' })
  @ApiResponse({ status: 200 })
  getOne(@Param('id') id: string): Client {
    return this.clientsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a client' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateClientDto): Client {
    return this.clientsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Full update' })
  @ApiResponse({ status: 200 })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto): Client {
    return this.clientsService.update(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partial update' })
  @ApiResponse({ status: 200 })
  patch(@Param('id') id: string, @Body() dto: UpdateClientDto): Client {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
