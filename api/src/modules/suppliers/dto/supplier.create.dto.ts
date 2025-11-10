import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({
    example: 'Tech Supplies Inc.',
    description: 'Name of the supplier',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'contact@techsupplies.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: '123 Industrial Ave', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
