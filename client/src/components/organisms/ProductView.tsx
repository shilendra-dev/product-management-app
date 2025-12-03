import type { Product } from "@/types/product";

function ProductView(selectedProduct: Product) {
  return (
    <div className="flex flex-col bg-background p-5 border rounded-xl gap-4 w-96">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-1">Product Details</h1>
      </div>
      <div className="flex flex-col">
        <p className="text-muted-foreground text-xs font-semibold">
          PRODUCT NAME
        </p>
        <h1 className="text-lg font-semibold">{selectedProduct.title}</h1>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-xs font-semibold">
          DESCRIPTION
        </p>
        <h1 className="text-sm tracking-tight">
          {selectedProduct.description}
        </h1>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-semibold">PRICE</p>
          <h1 className="text-sm">Rs.{selectedProduct.totalPrice}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-semibold">
            DISCOUNT
          </p>
          <h1 className="text-sm">Rs.{selectedProduct.totalDiscount}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-semibold">STOCK </p>
          <h1 className="text-sm">{selectedProduct.quantity}</h1>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-semibold">CREATED AT</p>
          <h1 className="text-sm">{new Date(selectedProduct.createdAt).toISOString().split("T")[0]}</h1>
        </div>
        <div className="flex flex-col gap-2 ml-17">
          <p className="text-muted-foreground text-xs font-semibold">
            UPDATED AT
          </p>
          <h1 className="text-sm">{new Date(selectedProduct.updatedAt).toISOString().split("T")[0]}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
