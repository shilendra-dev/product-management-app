import type { Product } from "./product";

export interface CreateProductInput {
  title: string;
  description?: string;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  quantity?: number;
  totalPrice?: number;
  totalDiscount?: number;
}

export interface ProductParams {
  limit: number;
  offset: number;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}