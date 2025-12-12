import { getProducts } from "@/services/productApi";
import type { ProductParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (params: ProductParams) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    })
}