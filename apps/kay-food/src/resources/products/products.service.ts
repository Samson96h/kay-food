import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@app/common/database';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }


  async findAll() {
    return this.productRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new NotFoundException('product not found')
    }
    return product
  }

}