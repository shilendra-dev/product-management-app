import Header from "@components/organisms/Header";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/templates/DataTable";
import { columns } from "@/components/organisms/Columns";
import { getProducts } from "@/services/productApi";
import type { Product } from "@/types/product";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const onCreateProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  }

  return (
    <div className="bg-secondary-background w-full h-screen flex flex-col">
      <div className="bg-secondary-background p-4 w-full flex items-center justify-center border-b">
        {/* HEADER */}
        <Header onCreateProduct={onCreateProduct} />
      </div>

      {/* BODY */}
      <div className="p-4 w-full flex items-center justify-center bg-secondary-background">
        <div className="flex flex-col gap-4 w-5xl bg-background">
          <div className="flex flex-col bg-background p-4 border rounded-xl">
            <h1 className="text-xl">Products</h1>
            <p className="text-muted-foreground text-sm">
              {products.length} products in inventory
            </p>
            <div className="mt-4">
              <DataTable columns={columns} data={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
