import Header from "@components/organisms/Header";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/templates/DataTable";
import { columns } from "@/components/organisms/Columns";
import type { Product } from "@/types/product";
import { UpdateProductDialog } from "@/components/organisms/UpdateProductDialog";
import Modal from "@/components/templates/Modal";
import { getProducts } from "@/services/productApi";
import { Input } from "@/components/ui/input";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts(
          pagination.pageSize,
          pagination.pageIndex * pagination.pageSize,
          search
        );
        setProducts(response.products);
        setRowCount(response.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [pagination.pageIndex, pagination.pageSize, search]);

  const onCreateProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setRowCount((prevCount) => prevCount + 1);
  };

  const onUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const onDeleteProduct = (deletedProductId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
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
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl">Products</h1>
                <p className="text-muted-foreground text-sm">
                  {products.length} products in inventory
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
                data={products}
                rowCount={rowCount}
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
