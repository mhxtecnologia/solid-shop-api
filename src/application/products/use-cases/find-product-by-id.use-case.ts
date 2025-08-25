import { Injectable } from '@nestjs/common';

// Repositories
import { ProductsRepository } from '@domain/products/repositories/products.repository';

// DTOs
import { ProductByIdOutputDto } from 'application/products/dtos/product-by-id-output.dto';

// Result pattern para Clean Architecture
type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

@Injectable()
export class findProductByIdUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(id: number): Promise<Result<ProductByIdOutputDto>> {
    try {
      // Validação de input
      if (!id || id <= 0) {
        return {
          success: false,
          error: 'ID de produto inválido',
        };
      }

      const product = await this.productsRepo.findProductById(id);

      // Produto não encontrado
      if (!product) {
        return {
          success: false,
          error: `Produto ID ${id} não encontrado`,
        };
      }

      // Produto inativo
      if (!product.status) {
        return {
          success: false,
          error: `Produto inativo`,
        };
      }

      // Sucesso
      return {
        success: true,
        data: {
          id: product.id,
          name: product.name,
          price: product.price.toString(), // Converte Decimal para string
          promotion: product.promotion?.toString() ?? undefined, // Converte se não for null
          description: product.description ?? undefined,
          status: product.status,
          photo: product.photo ?? undefined,
          stock: product.stock ?? undefined,
          category_id: product.category_id ?? undefined,
          created_at: product.created_at,
          updated_at: product.updated_at ?? undefined,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro interno do servidor ao buscar o produto por id.',
      };
    }
  }
}
