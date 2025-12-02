export interface Product {
  id: number;
  title: string;
  description?: string;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
