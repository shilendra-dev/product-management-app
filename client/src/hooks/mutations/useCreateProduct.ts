import { createProduct } from "@/services/productApi";
import type { CreateProductInput } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Product } from "@/types/product";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: CreateProductInput) => {
      return createProduct(data);
    },

    //Optimistc Update
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = await queryClient.getQueryData([
        "products",
        { limit: 10, offset: 0, search: "" },
      ]);

      console.log(previousProducts);

      queryClient.setQueryData(
        ["products", { limit: 10, offset: 0, search: "" }],
        (old: { products: Product[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            products: [
              ...old.products,
              {
                ...newProduct,
                id: "temp-id",
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
      );

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["products", { limit: 10, offset: 0, search: "" }],
          context.previousProducts
        );
      }
      console.error("Error creating product:", newProduct, err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: (data) => {
      //replacing the temp product with the one from server
      queryClient.setQueryData(
        ["products", { limit: 10, offset: 0, search: "" }],
        (old: { products: Product[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            products: old.products.filter(
              (product) => product.id !== "temp-id"
            ),
          };
        }
      );

      //added the product from api response
      queryClient.setQueryData(
        ["products", { limit: 10, offset: 0, search: "" }],
        (old: { products: Product[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            products: [...old.products, data],
          };
        }
      );
    },
  });
};
