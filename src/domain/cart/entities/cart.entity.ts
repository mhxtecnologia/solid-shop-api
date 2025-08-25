export interface Product {
  id: number;
  status: boolean;
  name: string;
  price: number;
  promotion?: number | null;
  stock?: number | null;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: number;
  client_id: number;
  items: CartItem[];
  created_at: Date;
  updated_at: Date | null;
}
