import { deleteProduct } from "@/services/productApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Product } from "@/types/product";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (productId: string) => {
      return deleteProduct(productId);
    },

    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = await queryClient.getQueryData(["products"]);

      queryClient.setQueryData(
        ["products"],
        (old: { products: Product[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            products: old.products.filter(
              (product) => product.id !== productId
            ),
          };
        }
      );

      return { previousProducts };
    },

    onError: (err, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      console.error("Error deleting product:", productId, err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: () => {
      console.log("Product deleted successfully");
    },  
  });
};
