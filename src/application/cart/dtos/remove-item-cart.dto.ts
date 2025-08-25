import { IsInt, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class RemoveItemCartDto {
  @ApiProperty({
    description: 'ID do produto a ser removido do carrinho',
    example: 1,
    type: 'integer',
  })
  @Type(() => Number) // Transforma string em number
  @IsInt({ message: 'product_id deve ser um número inteiro' })
  @IsPositive({ message: 'product_id deve ser um número positivo' })
  product_id: number;
}
