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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const updateProductSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    totalPrice: z.number().min(0, "Price cannot be negative"),
    quantity: z.number().min(0, "Quantity cannot be negative"),
    totalDiscount: z.number().min(0, "Discount cannot be negative"),
  })
  .refine((data) => data.totalDiscount <= data.totalPrice, {
    message: "Total Discount cannot exceed Total Price",
  });

type updateProductInput = z.infer<typeof updateProductSchema>;

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
  onUpdateProduct: (
    updatedProduct: Omit<
      Product,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    >,
    productId: string
  ) => void;
  onDeleteProduct: (deletedProductId: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateProductInput>({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      totalPrice: product?.totalPrice || 0,
      quantity: product?.quantity || 0,
      totalDiscount: product?.totalDiscount || 0,
    },
    resolver: zodResolver(updateProductSchema),
  });

  const onSubmit = (data: updateProductInput) => {
    try {
      setLoading(true);
      setError(null);
      if (!product) throw new Error("Product not found");
      onUpdateProduct(data, product.id);
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
      <form id="update-product-form" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("title", {
                  required: true,
                  minLength: 1,
                  maxLength: 100,
                })}
              />
              {errors.title && (
                <p className="text-destructive/70 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input
                placeholder="Product description..."
                {...register("description", { maxLength: 500 })}
              />
              {errors.description && (
                <p className="text-destructive/70 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...register("totalPrice", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                />
                {errors.totalPrice && (
                  <p className="text-destructive/70 text-xs">
                    {errors.totalPrice.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="0"
                  {...register("quantity", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                />
                {errors.quantity && (
                  <p className="text-destructive/70 text-xs">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Total Discount</Label>
              <Input
                type="number"
                placeholder="0"
                {...register("totalDiscount", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
              />
              {errors.totalDiscount && (
                <p className="text-destructive/70 text-xs">
                  {errors.totalDiscount.message}
                </p>
              )}
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
            <Button
              type="submit"
              disabled={isSubmitting}
              form="update-product-form"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
