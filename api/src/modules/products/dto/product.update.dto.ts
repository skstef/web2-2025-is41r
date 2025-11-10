import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Updated Laptop', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 899.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
