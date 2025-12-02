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
import { useState } from "react";

export function CreateProductDialog() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        totalDiscount: 0
    });

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value
        });
        console.log(formData);
    }
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
              <Input placeholder="Product title" onChange={onChange} name="title" value={formData.title} />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Input placeholder="Product description..." onChange={onChange} name="description" value={formData.description} />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input type="number" placeholder="0.00" onChange={onChange} name="price" value={formData.price} />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Quantity</Label>
                <Input type="number" placeholder="0" onChange={onChange} name="quantity" value={formData.quantity} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Total Discount</Label>
              <Input type="number" placeholder="0" onChange={onChange} name="totalDiscount" value={formData.totalDiscount} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={submitHandler}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
