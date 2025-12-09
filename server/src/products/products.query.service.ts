import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsQueryService {
  constructor(private prisma: PrismaService) {}

  async createProductQuery(createProductDto: CreateProductDto) {
    console.log('Creating product with data:', createProductDto);
    const product = await this.prisma.product.create({
      data: createProductDto,
    });
    return product;
  }

  async getAllProductsQuery(limit: number, offset: number) {
    const products = await this.prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
    });

    const total = await this.prisma.product.count({
      where: {
        deletedAt: null,
      },
    });

    return { products, total };
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
