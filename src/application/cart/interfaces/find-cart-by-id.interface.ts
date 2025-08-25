import { FindCartResponseDto } from '@application/cart/dtos/find-cart-response.dto';

export interface IFindCartById {
  execute(clientId: number): Promise<FindCartResponseDto | null>;
}
