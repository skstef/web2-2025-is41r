import {
  IsString,
  IsArray,
  IsNumber,
  Min,
  IsIn,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiProperty({ example: 'Annual Subscription' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'c1-uuid-here' })
  @IsUUID()
  clientId: string;

  @ApiProperty({ example: ['p1', 'p2'] })
  @IsArray()
  @IsUUID('all', { each: true })
  productIds: string[];

  @ApiProperty({ example: 12_500 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: 'draft',
    enum: ['draft', 'sent', 'accepted', 'rejected'],
  })
  @IsIn(['draft', 'sent', 'accepted', 'rejected'])
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}
