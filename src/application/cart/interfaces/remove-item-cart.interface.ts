export interface IRemoveItemCart {
  execute(clientId: number, productId: number): Promise<void>;
}
