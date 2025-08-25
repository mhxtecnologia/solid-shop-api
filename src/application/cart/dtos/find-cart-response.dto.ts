import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  product_id: number;

  @ApiProperty({ example: 'Smartphone XYZ' })
  product_name: string;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 899.99 })
  unit_price: number;

  @ApiProperty({ example: 1799.98 })
  total_price: number;
}

export class FindCartResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  client_id: number;

  @ApiProperty({ type: [CartItemDto] })
  items: CartItemDto[];

  @ApiProperty({ example: 1799.98 })
  total_cart_value: number;

  @ApiProperty({ example: '2024-08-24T13:37:42.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-08-24T13:37:42.000Z', nullable: true })
  updated_at: Date | null;
}
