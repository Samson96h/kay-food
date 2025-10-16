import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Category } from '@app/common/database';


@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  findAll() {
    return this.categoryRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

}