export interface Product {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ProductCreateInput {
  title: string;
  description?: string;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
}