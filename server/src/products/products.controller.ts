import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseUtil } from 'src/utils/responseUtil';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const data = await this.productsService.createProduct(createProductDto);
      return ResponseUtil.Ok(201, data, 'Product created successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to create product: ' + error);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param() params: { id: string },
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const data = await this.productsService.updateProduct(
        params.id,
        updateProductDto,
      );
      return ResponseUtil.Ok(200, data, 'Product updated successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to update product: ' + error);
    }
  }

  @Get()
  async getAllProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('search') search?: string,
  ) {
    try {
      const data = await this.productsService.getAllProducts(
        limit,
        offset,
        search,
      );
      return ResponseUtil.Ok(200, data, 'Products fetched successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to fetch products: ' + error);
    }
  }

  @Get(':id')
  async getProduct(@Param() params: { id: string }) {
    try {
      const data = await this.productsService.getProduct(params.id);
      return ResponseUtil.Ok(200, data, 'Product fetched successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to fetch product: ' + error);
    }
  }

  @Delete(':id')
  async softDelete(@Param() params: { id: string }) {
    try {
      const data = await this.productsService.softDelete(params.id);
      return ResponseUtil.Ok(200, data, 'Product soft deleted successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to soft delete product: ' + error);
    }
  }

  @Get(':id/restore')
  async restoreProduct(@Param() params: { id: string }) {
    try {
      const data = await this.productsService.restoreProduct(params.id);
      return ResponseUtil.Ok(200, data, 'Product restored successfully');
    } catch (error) {
      return ResponseUtil.Error(500, 'Failed to restore product: ' + error);
    }
  }
}
