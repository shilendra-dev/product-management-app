import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsQueryService {
  constructor(private prisma: PrismaService) {}

  async createProductQuery(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      console.error('Error in createProductQuery:', error);
      throw error;
    }
  }

  async getAllProductsQuery(limit: number, offset: number, search?: string) {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          deletedAt: null,
          OR: [
            {
              title: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          ],
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
    } catch (error) {
      console.error('Error in getAllProductsQuery:', error);
      throw error;
    }
  }

  async getProductByIdQuery(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
      return product;
    } catch (error) {
      console.error('Error in getProductByIdQuery:', error);
      throw error;
    }
  }

  async updateProductQuery(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      return updatedProduct;
    } catch (error) {
      console.error('Error in updateProductQuery:', error);
      throw error;
    }
  }
}
