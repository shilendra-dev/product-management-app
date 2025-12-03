import Header from "@components/organisms/Header";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/templates/DataTable";
import { columns } from "@/components/organisms/Columns";
import { getProducts } from "@/services/productApi";
import type { Product } from "@/types/product";
import { UpdateProductDialog } from "@/components/organisms/UpdateProductDialog";
import Modal from "@/components/templates/modal";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const onCreateProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const onUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

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
              <DataTable
                columns={columns}
                data={products}
                setSelectedProduct={(product) => {
                  setSelectedProduct(product);
                  setIsUpdateDialogOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && isUpdateDialogOpen && (
        <Modal
          isOpen={isUpdateDialogOpen}
          onClose={() => {
            setIsUpdateDialogOpen(false);
            setSelectedProduct(null);
          }}
        >
          <UpdateProductDialog product={selectedProduct} isUpdateDialogOpen={isUpdateDialogOpen} setIsUpdateDialogOpen={setIsUpdateDialogOpen} onUpdateProduct={onUpdateProduct} />
        </Modal>
      )}.
    </div>
  );
};

export default Inventory;
