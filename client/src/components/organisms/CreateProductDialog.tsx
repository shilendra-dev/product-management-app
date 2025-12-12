import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Plus } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/types/product";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
    quantity: z.number('Quantity required').min(1, "Quantity must be at least 1"),
    totalPrice: z.number('Total Price required').min(1, "Total Price must be at least 1"),
    totalDiscount: z.number('Invalid input').min(0, "Total Discount must be at least 0").default(0).optional(),
  })
  .refine((data) => data.totalDiscount! <= data.totalPrice, {
    message: "Total Discount cannot be greater than Total Price",
  });

type productCreateInput = z.infer<typeof productSchema>;

export function CreateProductDialog(props: {
  onCreateProduct: (newProduct: Product) => void;
}) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<productCreateInput>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: productCreateInput) => {
    props.onCreateProduct(data as Product);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
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
                <p className="text-destructive text-sm">
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
                {...register("totalDiscount", { min: 0, valueAsNumber: true })}
              />
              {errors.totalDiscount && (
                <p className="text-destructive/70 text-xs">
                  {errors.totalDiscount.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button ref={dialogCloseRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isSubmitting}
              type="submit"
              form="create-product-form"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
