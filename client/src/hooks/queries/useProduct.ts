import { getProductById } from "@/services/productApi"
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    })
}