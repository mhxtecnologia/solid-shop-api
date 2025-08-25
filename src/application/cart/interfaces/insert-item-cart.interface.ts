export interface IInsertItemCart {
  execute(clientId: number, productId: number): Promise<void>;
}
