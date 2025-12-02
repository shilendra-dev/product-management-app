import { create } from "zustand";
import api from "@/lib/axios";
import type { Product } from "@/types/product";

interface ProductStore {
    products: Product[];
    getProducts: () => Promise<void>;
}

const useProduct = create<ProductStore>((set) => ({
    products: [],
    getProducts: async () => {
        const res = await api.get<Product[]>("/products");
        set({ products: res.data });
    }
}))

export default useProduct;