import type { Product } from "@/types/product";
import { updateProduct } from "@/services/productApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({
      productData,
      productId,
    }: {
      productData: Omit<
        Product,
        "id" | "createdAt" | "updatedAt" | "deletedAt"
      >;
      productId: string;
    }) => {
      return updateProduct(productData, productId);
    },

    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
    },
  });
};
