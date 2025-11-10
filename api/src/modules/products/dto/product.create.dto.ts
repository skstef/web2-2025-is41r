import { IsString, IsNumber, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop Pro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 's1-uuid',
    description: 'Must be existing Supplier ID',
  })
  @IsUUID()
  supplierId: string;
}
