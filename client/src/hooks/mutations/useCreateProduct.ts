import { createProduct } from "@/services/productApi";
import type { CreateProductInput } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Product } from "@/types/product";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),

    //Optimistc Update
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(
        ["products"],
        (old: { products: Product[] }) => ({
          ...old,
          products: [
            ...old.products,
            {
              ...newProduct,
              id: "temp-id",
              createdAt: new Date().toISOString(),
            },
          ],
        })
      );
      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
