import { Injectable } from '@nestjs/common';

// Repositories
import { CartRepository } from '@domain/cart/repositories/cart.repository';

// DTOs
import { FindCartResponseDto } from '@application/cart/dtos/find-cart-response.dto';

// Interfaces
import { IFindCartById } from '@application/cart/interfaces/find-cart-by-id.interface';

@Injectable()
export class FindCartByIdUseCase implements IFindCartById {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(clientId: number): Promise<FindCartResponseDto | null> {
    const cart = await this.cartRepository.findByClientId(clientId);

    if (!cart) {
      return null;
    }

    let totalCartValue = 0;

    const items = cart.items.map((item) => {
      // Usa preço promocional se existir, senão usa preço normal
      const unitPrice = item.product.promotion
        ? Number(item.product.promotion)
        : Number(item.product.price);

      const totalPrice = unitPrice * item.quantity;
      totalCartValue += totalPrice;

      return {
        id: item.id,
        product_id: item.product_id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });

    return {
      id: cart.id,
      client_id: cart.client_id,
      items,
      total_cart_value: totalCartValue,
      created_at: cart.created_at,
      updated_at: cart.updated_at,
    };
  }
}
