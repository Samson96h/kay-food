import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@app/common';
import { CategoriesService } from './categories.service';
import { IdDTO } from '@app/common';


@UseGuards(AuthGuard)
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get(':id')
  findOne(@Param() param: IdDTO) {
    return this.categoriesService.findOne(param.id);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }


}
