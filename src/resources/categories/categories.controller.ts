import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,UploadedFile, UseGuards } from '@nestjs/common';


import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard,AuthGuard } from '../../guards';
import { CategoriesService } from './categories.service';
import { UserRole } from 'src/entities/enums/role.enum';
import { IdDTO } from 'src/dto/id-param.dto';


@UseGuards(AuthGuard, RolesGuard)
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Roles(UserRole.ADMIN)
  @Post('add')
  @UseInterceptors(FileInterceptor('photo'))
  async addCategory(
    @Body() dto: CreateCategoryDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.createCategory(dto, file);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async updateCategories(
    @Param() param: IdDTO,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoriesService.updateCategory(param.id, dto, file);
  }

  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdDTO) {
    return this.categoriesService.findOne(param.id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param() param: IdDTO) {
    return this.categoriesService.remove(param.id);
  }
}
