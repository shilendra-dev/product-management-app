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

      const previousProducts = await queryClient.getQueryData(["products"]);

      queryClient.setQueryData(
        ["products"],
        (old: { products: Product[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            products: old.products.map((product) =>
              product.id === updatedProduct.productId
                ? { ...product, ...updatedProduct.productData }
                : product
            ),
          };
        }
      );

      return { previousProducts };
    },
    onError: (err, updatedProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      console.error("Error updating product:", updatedProduct, err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: () => {
      console.log("Product updated successfully");
    },
  });
};
