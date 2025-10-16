import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto, UpdateProductDto, CreateIngredientDTO } from './dto';
import { AdminAuthGuard } from '@app/common'
import { ProductsService } from './products.service';
import { IdDTO } from '@app/common';


@UseGuards(AdminAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('photo'))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.create(dto, files);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param() param: IdDTO) {
    return this.productsService.findOne(param.id);
  }

  @Patch(":id")
  @UseInterceptors(FilesInterceptor('photos'))
  async updateCategory(
    @Body() dto: UpdateProductDto,
    @Param() param: IdDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.updateProductData(param.id, dto, files || [])
  }

  @Delete(":id")
  async deleteProduct(@Param() param: IdDTO) {
    return this.productsService.removeProduct(param.id);
  }


  @Post('add/ingredient')
  async addIngredient (@Body() dto:CreateIngredientDTO) {
    return this.productsService.addIngredient(dto)
  }

}
