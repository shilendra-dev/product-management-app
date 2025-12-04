import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsQueryService {
  constructor(private prisma: PrismaService) {}
  // Add query-related methods here in the future
  async createProductQuery(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  async getAllProductsQuery() {
    //exclude deleted products
    const products = await this.prisma.product.findMany({
      where: { deletedAt: null },
    });
    return products;
  }

  async getProductByIdQuery(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async updateProductQuery(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    return updatedProduct;
  }
}
