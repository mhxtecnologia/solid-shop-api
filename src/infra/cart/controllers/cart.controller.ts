import {
  Get,
  Post,
  Delete,
  Controller,
  Body,
  NotFoundException,
  UseGuards,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

// Use Cases
import { FindCartByIdUseCase } from '@application/cart/use-cases/find-cart-by-id.use-case';
import { InsertItemCartUseCase } from '@application/cart/use-cases/insert-item-cart.use-case';
import { RemoveItemCartUseCase } from '@application/cart/use-cases/remove-item-cart.use-case';

// DTOs
import { InsertItemCartDto } from '@application/cart/dtos/insert-item-cart.dto';
import { RemoveItemCartDto } from '@application/cart/dtos/remove-item-cart.dto';

// Guards & Decorators
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { CurrentUser } from '@infra/auth/user.decorator';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/cart')
export class CartController {
  constructor(
    private readonly findCartByIdUseCase: FindCartByIdUseCase,
    private readonly insertItemCartUseCase: InsertItemCartUseCase,
    private readonly removeItemCartUseCase: RemoveItemCartUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Buscar carrinho do usuário logado' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        cart: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            client_id: { type: 'number' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  product_id: { type: 'number' },
                  product_name: { type: 'string' },
                  quantity: { type: 'number' },
                  unit_price: { type: 'number' },
                  total_price: { type: 'number' },
                },
              },
            },
            total_cart_value: { type: 'number' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async FindCartByClientId(@CurrentUser('sub') clientId: number) {
    const cart = await this.findCartByIdUseCase.execute(clientId);

    // Tratamento para carrinho não encontrado
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado para o usuário.');
    }

    return { cart };
  }

  // ===========================================================================================

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // Converte tipos automaticamente
      },
    }),
  )
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiBody({
    description: 'Dados do produto a ser adicionado',
    type: InsertItemCartDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado ao carrinho com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou produto sem estoque',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado',
  })
  async InsertItemCart(
    @CurrentUser('sub') clientId: number,
    @Body() { product_id }: InsertItemCartDto,
  ) {
    await this.insertItemCartUseCase.execute(clientId, product_id);

    return {
      message: 'Item adicionado ao carrinho com sucesso',
    };
  }

  // ===========================================================================================

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiBody({
    description: 'Dados do produto a ser removido',
    type: RemoveItemCartDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Item removido do carrinho com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho ou item não encontrado',
  })
  async RemoveItemCart(
    @CurrentUser('sub') clientId: number,
    @Body() { product_id }: RemoveItemCartDto,
  ) {
    await this.removeItemCartUseCase.execute(clientId, product_id);

    return {
      message: 'Item removido do carrinho com sucesso',
    };
  }
}
