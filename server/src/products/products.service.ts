import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryService } from './products.query.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private productsQueryService: ProductsQueryService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { title, quantity, totalPrice, totalDiscount } = createProductDto;
    console.log('Received create product request:', createProductDto);
    if (!title || !quantity || !totalPrice || totalDiscount === undefined) {
      return 'Missing required fields';
    }
    try {
      const result =
        await this.productsQueryService.createProductQuery(createProductDto);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error creating product:', error);
      return 'Error creating product';
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productsQueryService.updateProductQuery(
        id,
        updateProductDto,
      );
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      return 'Error updating product';
    }
  }

  async getAllProducts(limit: number, offset: number) {
    try {
      const { products, total } =
        await this.productsQueryService.getAllProductsQuery(limit, offset);
      return {
        products: products,
        limit: limit,
        offset: offset,
        totalProducts: total,
      };
    } catch (error) {
      console.error('Error getting all products:', error);
      return 'Error getting all products';
    }
  }

  async getProduct(id: string) {
    try {
      const product = await this.productsQueryService.getProductByIdQuery(id);
      return product;
    } catch (error) {
      console.error('Error getting product by id:', error);
      return 'Error getting product by id';
    }
  }

  async softDelete(id: string) {
    try {
      const deletedProduct = await this.productsQueryService.updateProductQuery(
        id,
        { deletedAt: new Date() },
      );
      return deletedProduct;
    } catch (error) {
      console.error('Error soft deleting product:', error);
      return 'Error soft deleting product';
    }
  }

  async restoreProduct(id: string) {
    try {
      const restoredProduct =
        await this.productsQueryService.updateProductQuery(id, {
          deletedAt: null,
        });
      return restoredProduct;
    } catch (error) {
      console.error('Error restoring product:', error);
      return 'Error restoring product';
    }
  }
}
