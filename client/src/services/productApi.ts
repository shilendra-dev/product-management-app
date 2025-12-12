import api from "@/lib/axios";
import type { Product } from "@/types/product";
import type { ProductParams } from "@/types/api";

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

export const getProducts = async ({
  limit,
  offset,
  search,
}: ProductParams): Promise<{
  products: Product[];
  totalProducts: number;
  limit: number;
  offset: number;
  search?: string;
}> => {
  try {
    const response = await api.get<{
      products: Product[];
      totalProducts: number;
      limit: number;
      offset: number;
      search?: string;
    }>(`/products?offset=${offset}&limit=${limit}&search=${search || ""}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (
  productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">,
  productId: string
): Promise<Product> => {
  try {
    console.log("Updating product with ID:", productId, "and data:", productData);
    const response = await api.put<Product>(
      `/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<Product> => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
