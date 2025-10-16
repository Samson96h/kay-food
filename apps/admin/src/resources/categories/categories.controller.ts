import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateCategoryDto, CreateCategoryDTO } from './dto'
import { CategoriesService } from './categories.service';
import { AdminAuthGuard, IdDTO } from '@app/common';


@UseGuards(AdminAuthGuard)
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('add')
  @UseInterceptors(FileInterceptor('photo'))
  async addCategory(
    @Body() dto: CreateCategoryDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.createCategory(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async updateCategories(
    @Param() param: IdDTO,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoriesService.updateCategory(param.id, dto, file);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdDTO) {
    return this.categoriesService.findOne(param.id);
  }

  @Delete(':id')
  remove(@Param() param: IdDTO) {
    return this.categoriesService.remove(param.id);
  }
}
