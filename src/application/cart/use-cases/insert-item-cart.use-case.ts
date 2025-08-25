import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

// Repositories
import { CartRepository } from '@domain/cart/repositories/cart.repository';
import { ProductsRepository } from '@domain/products/repositories/products.repository';

// Interfaces
import { IInsertItemCart } from '@application/cart/interfaces/insert-item-cart.interface';

@Injectable()
export class InsertItemCartUseCase implements IInsertItemCart {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(clientId: number, productId: number): Promise<void> {
    // Verificar se o produto existe e está ativo
    const product = await this.productsRepository.findProductById(productId);
    if (!product || !product.status) {
      throw new NotFoundException('Produto não encontrado ou inativo');
    }

    // Verificar estoque se não for ilimitado
    if (
      product.stock !== null &&
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      throw new BadRequestException('Produto sem estoque disponível');
    }

    // Buscar ou criar carrinho do cliente
    let cart = await this.cartRepository.findByClientId(clientId);
    if (!cart) {
      cart = await this.cartRepository.createCart(clientId);
    }

    // Verificar se o item já existe no carrinho
    const existingItem = await this.cartRepository.findCartItem(
      cart.id,
      productId,
    );

    if (existingItem) {
      // Se já existe, incrementar quantidade
      const newQuantity = existingItem.quantity + 1;

      // Verificar estoque novamente para a nova quantidade
      if (
        product.stock !== null &&
        product.stock !== undefined &&
        newQuantity > product.stock
      ) {
        throw new BadRequestException(
          'Quantidade solicitada excede o estoque disponível',
        );
      }

      await this.cartRepository.updateCartItemQuantity(
        existingItem.id,
        newQuantity,
      );
    } else {
      // Se não existe, criar novo item
      await this.cartRepository.addItemToCart(cart.id, productId, 1);
    }
  }
}
