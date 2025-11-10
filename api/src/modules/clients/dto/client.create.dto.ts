import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'contact@acme.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+15551234567', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Acme Inc.', required: false })
  @IsOptional()
  @IsString()
  company?: string;
}
