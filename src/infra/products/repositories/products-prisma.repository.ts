import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';

import { ProductsRepository } from '@domain/products/repositories/products.repository';
import { ProductEntity } from '@domain/products/entities/products.entity';

@Injectable()
export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findProductById(id: number): Promise<ProductEntity | null> {
    const result = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!result) return null;
    
    return {
      id: result.id,
      status: result.status,
      name: result.name,
      price: Number(result.price), // Conversão Decimal → number
      created_at: result.created_at,
      category_id: result.category_id,
      photo: result.photo,
      promotion: result.promotion ? Number(result.promotion) : null, // Conversão Decimal → number
      description: result.description,
      stock: result.stock,
      updated_at: result.updated_at,
    };
  }

  // buscar produtos ativos
  async findActiveProducts(): Promise<ProductEntity[]> {
    const results = await this.prisma.products.findMany({
      where: { status: true },
      orderBy: { created_at: 'desc' },
    });

    return results.map(result => ({
      id: result.id,
      status: result.status,
      name: result.name,
      price: Number(result.price),
      created_at: result.created_at,
      category_id: result.category_id,
      photo: result.photo,
      promotion: result.promotion ? Number(result.promotion) : null,
      description: result.description,
      stock: result.stock,
      updated_at: result.updated_at,
    }));
  }

  // buscar produtos por categoria
  async findProductsByCategory(categoryId: number): Promise<ProductEntity[]> {
    const results = await this.prisma.products.findMany({
      where: { 
        category_id: categoryId,
        status: true 
      },
      orderBy: { name: 'asc' },
    });

    return results.map(result => ({
      id: result.id,
      status: result.status,
      name: result.name,
      price: Number(result.price),
      created_at: result.created_at,
      category_id: result.category_id,
      photo: result.photo,
      promotion: result.promotion ? Number(result.promotion) : null,
      description: result.description,
      stock: result.stock,
      updated_at: result.updated_at,
    }));
  }
}