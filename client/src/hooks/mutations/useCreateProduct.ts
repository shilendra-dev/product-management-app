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
      console.error("Error creating product:", newProduct, err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onSuccess: (data) => {
        //replacing the temp product with the one from server
        queryClient.setQueryData(["products"], (old: { products: Product[] }) => ({
          ...old,
          products: old.products.filter((product) => product.id !== "temp-id"),
        }));

        //added the product from api response
        queryClient.setQueryData(["products"], (old: { products: Product[] }) => ({
          ...old,
          products: [...old.products, data],
        }));
    }
  });
};
