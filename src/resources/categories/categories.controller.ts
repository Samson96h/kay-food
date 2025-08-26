import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,UploadedFile, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from 'src/entities/enums/role.enum';


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
  async updateCat(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoriesService.updateCategory(id, dto, file);
  }

  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
