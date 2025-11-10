import { IsString, IsNumber, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiProperty({ example: 'Laptop Sale' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'c1-uuid', description: 'Existing Client ID' })
  @IsUUID()
  clientId: string;

  @ApiProperty({ example: 'p1-uuid', description: 'Existing Product ID' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 999 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: 'sent',
  })
  @IsString()
  status: string;
}
