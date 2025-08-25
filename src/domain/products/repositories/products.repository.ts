import { ProductEntity } from '@domain/products/entities/products.entity';

export abstract class ProductsRepository {
  abstract findProductById(id: number): Promise<ProductEntity | null>;
}
