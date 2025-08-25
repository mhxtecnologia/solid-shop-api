import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { CartRepository } from '@domain/cart/repositories/cart.repository';

// Interfaces
import { IRemoveItemCart } from '@application/cart/interfaces/remove-item-cart.interface';

@Injectable()
export class RemoveItemCartUseCase implements IRemoveItemCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(clientId: number, productId: number): Promise<void> {
    // Buscar carrinho do cliente
    const cart = await this.cartRepository.findByClientId(clientId);
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    // Buscar item no carrinho
    const cartItem = await this.cartRepository.findCartItem(cart.id, productId);
    if (!cartItem) {
      throw new NotFoundException('Item não encontrado no carrinho');
    }

    // Remover item do carrinho
    await this.cartRepository.removeItemFromCart(cartItem.id);
  }
}
