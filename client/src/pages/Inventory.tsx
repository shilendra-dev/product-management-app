import Header from "@components/organisms/Header";
import { useState } from "react";
import { DataTable } from "@/components/templates/DataTable";
import { columns } from "@/components/organisms/Columns";
import type { Product } from "@/types/product";
import { UpdateProductDialog } from "@/components/organisms/UpdateProductDialog";
import Modal from "@/components/templates/Modal";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/queries/useProducts";
import { useCreateProduct } from "@/hooks/mutations/useCreateProduct";
import { useUpdateProduct } from "@/hooks/mutations/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/mutations/useDeleteProduct";

const Inventory = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useProducts({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search,
  });

  const {mutate: createProduct} = useCreateProduct();
  const {mutate: updateProduct} = useUpdateProduct();
  const {mutate: deleteProduct} = useDeleteProduct();

  const onCreateProduct = (newProduct: Product) => {
    createProduct(newProduct);
  };

  const onUpdateProduct = (updatedProduct: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">, productId: string) => {
    updateProduct({ productData: updatedProduct, productId: productId });
  };

  const onDeleteProduct = (deletedProductId: string) => {
    deleteProduct(deletedProductId);
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
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl">Products</h1>
                <p className="text-muted-foreground text-sm">
                  {data ? data.totalProducts : 0} products in inventory
                </p>
              </div>
              <Input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={data ? data.products : []}
                rowCount={data ? data.totalProducts : 0}
                isLoading={isLoading}
                onPaginationChange={setPagination}
                currentPageIndex={pagination.pageIndex}
                currentPageSize={pagination.pageSize}
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
          <UpdateProductDialog
            product={selectedProduct}
            isUpdateDialogOpen={isUpdateDialogOpen}
            setIsUpdateDialogOpen={setIsUpdateDialogOpen}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        </Modal>
      )}
    </div>
  );
};

export default Inventory;
