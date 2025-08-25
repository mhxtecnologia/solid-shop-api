import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { CartRepository } from '@domain/cart/repositories/cart.repository';
import { Cart, CartItem } from '@domain/cart/entities/cart.entity';

@Injectable()
export class CartPrismaRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByClientId(clientId: number): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { client_id: clientId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                status: true,
                name: true,
                price: true,
                promotion: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!cart) return null;

    return {
      id: cart.id,
      client_id: cart.client_id,
      items: cart.items.map((item) => ({
        id: item.id,
        cart_id: item.cart_id,
        product_id: item.product_id,
        product: {
          id: item.product.id,
          status: item.product.status,
          name: item.product.name,
          price: Number(item.product.price),
          promotion: item.product.promotion
            ? Number(item.product.promotion)
            : null,
          stock: item.product.stock ?? null, // Converte undefined para null
        },
        quantity: item.quantity,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })),
      created_at: cart.created_at,
      updated_at: cart.updated_at ?? null, // Converte undefined para null
    };
  }

  async createCart(clientId: number): Promise<Cart> {
    const cart = await this.prisma.cart.create({
      data: { client_id: clientId },
      include: { items: true },
    });

    return {
      id: cart.id,
      client_id: cart.client_id,
      items: [],
      created_at: cart.created_at,
      updated_at: cart.updated_at ?? null,
    };
  }

  async findCartItem(
    cartId: number,
    productId: number,
  ): Promise<CartItem | null> {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        cart_id_product_id: {
          cart_id: cartId,
          product_id: productId,
        },
      },
      include: {
        product: {
          select: {
            id: true,
            status: true,
            name: true,
            price: true,
            promotion: true,
            stock: true,
          },
        },
      },
    });

    if (!item) return null;

    return {
      id: item.id,
      cart_id: item.cart_id,
      product_id: item.product_id,
      product: {
        id: item.product.id,
        status: item.product.status,
        name: item.product.name,
        price: Number(item.product.price),
        promotion: item.product.promotion
          ? Number(item.product.promotion)
          : null,
        stock: item.product.stock ?? null, // Converte undefined para null
      },
      quantity: item.quantity,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  }

  async addItemToCart(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    await this.prisma.cartItem.create({
      data: {
        cart_id: cartId,
        product_id: productId,
        quantity,
      },
    });
  }

  async updateCartItemQuantity(
    itemId: number,
    quantity: number,
  ): Promise<void> {
    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItemFromCart(itemId: number): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}
