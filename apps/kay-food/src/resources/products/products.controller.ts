import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { AuthGuard } from '@app/common'
import { IdDTO } from '@app/common';


@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get(':id')
  async findOne(@Param() param: IdDTO) {
    return this.productsService.findOne(param.id);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll()
  }

}
