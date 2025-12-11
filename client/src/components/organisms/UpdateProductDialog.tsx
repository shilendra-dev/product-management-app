import type { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../molecules/Dialog";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";
import Button from "../atoms/Button";
import { useState } from "react";

export function UpdateProductDialog({
  product,
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  onUpdateProduct,
  onDeleteProduct,
}: {
  product: Product | null;
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateProduct: (updatedProduct: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">, productId: string) => void;
  onDeleteProduct: (deletedProductId: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<
    Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
  >({
    title: product?.title || "",
    description: product?.description || "",
    totalPrice: product?.totalPrice || 0,
    quantity: product?.quantity || 0,
    totalDiscount: product?.totalDiscount || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "title" || name === "description" ? value : Number(value),
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    //Validations
    if (!formData.title || !formData.totalPrice || !formData.quantity) {
      setError("Title, Price, and Quantity are required fields.");
      setLoading(false);
      return;
    }
    if (
      formData.totalPrice < 0 ||
      formData.quantity < 0 ||
      formData.totalDiscount < 0
    ) {
      setError("Price, Quantity, and Discount cannot be negative.");
      setLoading(false);
      return;
    }
    if (formData.totalDiscount > formData.totalPrice) {
      setError("Total Discount cannot exceed Total Price.");
      setLoading(false);
      return;
    }

    try {
      if (!product) throw new Error("Product not found");
      onUpdateProduct(formData, product.id);
      setLoading(false);
      setIsUpdateDialogOpen(false);
    } catch (error) {
      setError("Failed to update product. Please try again. Error: " + error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!product) throw new Error("Product not found");
      onDeleteProduct(product.id);
      setLoading(false);
      setIsUpdateDialogOpen(false);
    } catch (error) {
      setError("Failed to delete product. Please try again. Error: " + error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              View or edit the details of your product.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                placeholder="Product title"
                onChange={handleChange}
                name="title"
                value={formData.title}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input
                placeholder="Product description..."
                onChange={handleChange}
                name="description"
                value={formData.description}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  name="totalPrice"
                  value={formData.totalPrice}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="0"
                  name="quantity"
                  onChange={handleChange}
                  value={formData.quantity}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Total Discount</Label>
              <Input
                type="number"
                onChange={handleChange}
                placeholder="0"
                name="totalDiscount"
                value={formData.totalDiscount}
              />
            </div>
            <div className="flex">
              <div className="flex flex-col gap-1">
                <Label>Date Created:</Label>
                <h1 className="text-sm text-muted-foreground rounded-md">
                  {new Date(product?.createdAt || "").toLocaleDateString()}
                </h1>
              </div>
              <div className="flex flex-col gap-1 ml-30">
                <Label>Date Updated:</Label>
                <h1 className="text-sm text-muted-foreground rounded-md">
                  {new Date(product?.updatedAt || "").toLocaleDateString()}
                </h1>
              </div>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
            <Button type="submit" disabled={loading} onClick={submitHandler}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
