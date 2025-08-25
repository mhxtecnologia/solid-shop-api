import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@infra/prisma/prisma.service';

// Controllers
import { CartController } from '@infra/cart/controllers/cart.controller';

// Use Cases
import { FindCartByIdUseCase } from '@application/cart/use-cases/find-cart-by-id.use-case';
import { InsertItemCartUseCase } from '@application/cart/use-cases/insert-item-cart.use-case';
import { RemoveItemCartUseCase } from '@application/cart/use-cases/remove-item-cart.use-case';

// Repositories
import { CartRepository } from '@domain/cart/repositories/cart.repository';
import { ProductsRepository } from '@domain/products/repositories/products.repository';
import { CartPrismaRepository } from '@infra/cart/repositories/cart.prisma.repository';
import { ProductsPrismaRepository } from '@infra/products/repositories/products-prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        // Em desenvolvimento: token nunca expira
        // Em produção: usa JWT_EXPIRES_IN ou 24h como padrão
        ...(process.env.NODE_ENV === 'production' && {
          expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        }),
      },
    }),
  ],
  controllers: [CartController],
  providers: [
    // Services
    PrismaService,

    // Use Cases
    FindCartByIdUseCase,
    InsertItemCartUseCase,
    RemoveItemCartUseCase,

    // Repository Bindings
    {
      provide: CartRepository,
      useClass: CartPrismaRepository,
    },
    {
      provide: ProductsRepository,
      useClass: ProductsPrismaRepository,
    },
  ],
})
export class CartModule {}
