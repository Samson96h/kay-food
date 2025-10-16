import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProductDto, CreateProductDto, CreateIngredientDTO } from './dto';
import { Product, Ingredient, Category, MediaFiles } from '@app/common/database';
import { FileHelper, PhotoValidator } from '@app/common/helpers';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) { }


  async create(dto: CreateProductDto, files?: Express.Multer.File[]) {
    const nameCheck = await this.productRepository.findOne({
      where: { productName: dto.productName },
    });

    if (nameCheck) {
      throw new ConflictException('This product name already exists, please rename');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found, please try again');
    }

    const photoEntities: MediaFiles[] = [];

    if (files?.length) {
      for (const file of files) {
        const validated = PhotoValidator.validator(file);

        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size,
        });

        const savedPhoto = await this.mediaRepository.save(photoEntity);
        photoEntities.push(savedPhoto);
      }
    }

    const product = this.productRepository.create({
      productName: dto.productName,
      description: dto.description,
      weigth: dto.weigth,
      price: dto.price,
      categoryId: category,
      mediaFiles: photoEntities,
    });

    await this.productRepository.save(product);

    return product;
  }

  async updateProductData(id: number, updateDto: UpdateProductDto, files?: Express.Multer.File[]) {
    const product = await this.productRepository.findOne({ where: { id }, relations: ["mediaFiles"] })

    if (!product) {
      throw new NotFoundException('Category not found')
    }

    product.productName = updateDto.productName ?? product.productName
    product.description = updateDto.description ?? product.description
    product.weigth = updateDto.weigth ?? product.weigth
    product.price = updateDto.price ?? product.price


    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'products'),
          size: validated.size
        })
        product.mediaFiles.push(photoEntity)
      }
    }
    return this.productRepository.save(product)


  }

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

  async removeProduct(id: number) {
    const findProduct = await this.productRepository.findOne({ where: { id } })

    if (!findProduct) {
      throw new NotFoundException('Not found this product')
    }

    await this.productRepository.remove(findProduct)
    return { message: "product are succes deleted" }
  }

  async addIngredient(dto:CreateIngredientDTO) {
    const existing = await this.ingredientRepository.findOne({where:{name:dto.name}})

    if(existing) {
      throw new ConflictException('This ingredient name already exists, please rename')
    }

    const ingredient = await this.ingredientRepository.create({
      name:dto.name,
      price:dto.price
    })

    await this.ingredientRepository.save(ingredient)

    return ingredient
  }

}