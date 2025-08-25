import { Cart, CartItem } from '@domain/cart/entities/cart.entity';

export abstract class CartRepository {
  abstract findByClientId(clientId: number): Promise<Cart | null>;
  abstract createCart(clientId: number): Promise<Cart>;
  abstract findCartItem(
    cartId: number,
    productId: number,
  ): Promise<CartItem | null>;
  abstract addItemToCart(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void>;
  abstract updateCartItemQuantity(
    itemId: number,
    quantity: number,
  ): Promise<void>;
  abstract removeItemFromCart(itemId: number): Promise<void>;
}
