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

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  updateProduct(
    @Param() params: { id: string },
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(params.id, updateProductDto);
  }

  @Get()
  getAllProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.productsService.getAllProducts(limit, offset);
  }

  @Get(':id')
  getProduct(@Param() params: { id: string }) {
    return this.productsService.getProduct(params.id);
  }

  @Delete(':id')
  softDelete(@Param() params: { id: string }) {
    return this.productsService.softDelete(params.id);
  }

  @Get(':id/restore')
  restoreProduct(@Param() params: { id: string }) {
    return this.productsService.restoreProduct(params.id);
  }
}
