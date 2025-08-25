export class ProductByIdOutputDto {
  id: number;
  status: boolean;
  name: string;
  price: string; // Decimal convertido para string para evitar perda de precisão
  created_at: Date;

  category_id?: number;
  photo?: string;
  promotion?: string; // Preço promocional também como string
  description?: string;
  stock?: number;
  updated_at?: Date;
}
