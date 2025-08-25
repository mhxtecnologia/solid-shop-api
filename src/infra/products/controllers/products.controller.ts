import {
  Get,
  Controller,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

// Use Cases
import { findProductByIdUseCase } from '@application/products/use-cases/find-product-by-id.use-case';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly findProductById: findProductByIdUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar produto por ID',
    description:
      'Retorna os detalhes de um produto específico baseado no ID fornecido',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único do produto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'ID único do produto',
              example: 1,
            },
            status: {
              type: 'boolean',
              description: 'Status ativo/inativo do produto',
              example: true,
            },
            category_id: {
              type: 'number',
              nullable: true,
              description: 'ID da categoria do produto',
              example: 2,
            },
            photo: {
              type: 'string',
              nullable: true,
              description: 'URL da foto do produto',
              example: 'https://example.com/product-photo.jpg',
            },
            name: {
              type: 'string',
              description: 'Nome do produto',
              example: 'Smartphone XYZ',
            },
            price: {
              type: 'number',
              description: 'Preço do produto em reais',
              example: 899.99,
            },
            promotion: {
              type: 'number',
              nullable: true,
              description: 'Preço promocional do produto (se houver)',
              example: 799.99,
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Descrição detalhada do produto',
              example: 'Smartphone com 128GB de armazenamento e câmera de 48MP',
            },
            stock: {
              type: 'number',
              nullable: true,
              description: 'Quantidade em estoque (null = estoque ilimitado)',
              example: 50,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do produto',
              example: '2024-01-15T10:30:00Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Data da última atualização do produto',
              example: '2024-01-20T14:45:00Z',
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Produto não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 404,
        },
        message: {
          type: 'string',
          example: 'Produto ID 999 não encontrado.',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID do produto inválido',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: 400,
        },
        message: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['Validation failed (numeric string is expected)'],
        },
        error: {
          type: 'string',
          example: 'Bad Request',
        },
      },
    },
  })
  async FindById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.findProductById.execute(id);

    // Tratamento para produto não encontrado
    if (!product) {
      throw new NotFoundException(`Produto ID ${id} não encontrado.`);
    }

    return { product };
  }
}
