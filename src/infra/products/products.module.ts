import { Module } from '@nestjs/common';

// Controllers
import { ProductsController } from '@infra/products/controllers/products.controller';

// Services
import { PrismaService } from '@infra/prisma/prisma.service';

// Use Cases
import { findProductByIdUseCase } from 'application/products/use-cases/find-product-by-id.use-case';

// Repositories
import { ProductsPrismaRepository } from '@infra/products/repositories/products-prisma.repository';
import { ProductsRepository } from '@domain/products/repositories/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    PrismaService,
    // ProductsService,
    findProductByIdUseCase,
    ProductsPrismaRepository,
    {
      provide: ProductsRepository, // Interface abstrata
      useClass: ProductsPrismaRepository, // Implementação concreta
    },
  ],
})
export class ProductsModule {}
