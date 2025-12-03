import api from "@/lib/axios";
import type { Product } from "@/types/product";

export const createProduct = async (
  productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<Product> => {
  try {
    const response = await api.post<Product>("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>("/products");
        return response.data;
    }catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}
