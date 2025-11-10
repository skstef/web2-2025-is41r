import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 999.99, description: 'The price of the product' })
  @IsNumber()
  @Min(0)
  price: number;
}
