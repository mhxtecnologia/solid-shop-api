export interface ProductEntity {
  readonly id: number;
  status: boolean;
  name: string;
  price: number; // Domain usa number, não Decimal do Prisma
  created_at: Date;
  category_id?: number | null;
  photo?: string | null;
  promotion?: number | null;
  description?: string | null;
  stock?: number | null;
  updated_at?: Date | null;
}
