import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto, UpdateProductDto, CreateIngredientDTO } from './dto';
import { Roles, RolesGuard,AuthGuard } from '../../guards';
import { UserRole } from 'src/entities/enums/role.enum';
import { ProductsService } from './products.service';
import { IdDTO } from 'src/dto/id-param.dto';


@UseGuards(AuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Roles(UserRole.ADMIN)
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

  
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(":id")
  @UseInterceptors(FilesInterceptor('photos'))
  async updateCategory(
    @Body() dto: UpdateProductDto,
    @Param() param: IdDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.updateProductData(param.id, dto, files || [])
  }


  @Roles(UserRole.ADMIN)
  @Delete(":id")
  async deleteProduct(@Param() param: IdDTO) {
    return this.productsService.removeProduct(param.id);
  }
  @Roles(UserRole.ADMIN)
  @Post('add/ingredient')
  async addIngredient (@Body() dto:CreateIngredientDTO) {
    return this.productsService.addIngredient(dto)
  }

}
