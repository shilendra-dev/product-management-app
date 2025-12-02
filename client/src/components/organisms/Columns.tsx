import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "quantity",
        header: "Quantity"
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price"
    },
    {
        accessorKey: "totalDiscount",
        header: "Total Discount"
    },
]