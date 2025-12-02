export class CreateProductDto {
  title: string;
  description?: string;
  quantity: number;
  totalPrice: number;
  totalDiscount: number;
}
