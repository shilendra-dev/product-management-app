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
import { useRef, useState } from "react";
import { createProduct } from "@/services/productApi";
import type { Product } from "@/types/product";

export function CreateProductDialog(props: {
  onCreateProduct: (newProduct: Product) => void;
}) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<
    Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
  >({
    title: "",
    description: "",
    totalPrice: 0,
    quantity: 0,
    totalDiscount: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(null);
      if(!formData.title || !formData.totalPrice || !formData.quantity){
        setError("Title, Price, and Quantity are required fields.");
        console.error("Title, Price, and Quantity are required fields.");
        setLoading(false);
        return;
      }
      if(formData.totalPrice < 0 || formData.quantity < 0 || formData.totalDiscount < 0){
        setError("Price, Quantity, and Discount cannot be negative.");
        setLoading(false);
        return;
      }
      if(formData.totalDiscount > formData.totalPrice){
        setError("Total Discount cannot exceed Total Price.");
        setLoading(false);
        return;
      }
      console.log("Creating product with data:", formData);
      const newProduct = await createProduct(formData);
      props.onCreateProduct(newProduct);
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
      setLoading(false);
    }catch(error){
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again.");
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
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
                onChange={onChange}
                name="title"
                value={formData.title}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input
                placeholder="Product description..."
                onChange={onChange}
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
                  onChange={onChange}
                  name="totalPrice"
                  value={formData.totalPrice}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="0"
                  onChange={onChange}
                  name="quantity"
                  value={formData.quantity}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Total Discount</Label>
              <Input
                type="number"
                placeholder="0"
                onChange={onChange}
                name="totalDiscount"
                value={formData.totalDiscount}
              />
            </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={dialogCloseRef} variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={submitHandler} disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
