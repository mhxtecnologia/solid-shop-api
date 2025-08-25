import { Module } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from '@infra/products/products.module';
import { CartModule } from '@infra/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Carrega o arquivo baseado no NODE_ENV
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // .env.development, .env.production, etc.
        '.env', // Fallback para .env padrão
      ],
      isGlobal: true,
      expandVariables: true, // Permite usar variáveis dentro de outras variáveis
    }),
    ProductsModule,
    CartModule,
  ],
  controllers: [],
  providers: [
    {
      // Provider global de validação de dados
      // Aplica automaticamente validação em todos os endpoints da aplicação
      provide: APP_PIPE, // Token que indica um pipe global
      useValue: new ValidationPipe({
        transform: true, // Converte dados automaticamente (string → number, etc.)
        whitelist: true, // Remove propriedades não definidas nos DTOs
        forbidNonWhitelisted: true, // Rejeita requisições com propriedades extras
        transformOptions: {
          enableImplicitConversion: true, // Converte tipos implicitamente (ex: "123" → 123)
        },
      }),
    },
  ],
})
export class AppModule {}
