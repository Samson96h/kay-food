import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories-entiti';
import { Repository } from 'typeorm';
import { FileHelper } from 'src/helpers/file-helper';
import { PhotoValidator } from 'src/helpers/photos-validator-helper';
import { MediaFiles } from 'src/entities/media-files';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>
  ) { }

  async createCategory(dto: CreateCategoryDTO, file?: Express.Multer.File) {

    let parent: Category | undefined;

    const parentId = dto.parentId
    const catName = dto.name

    if (parentId) {
      const found = await this.categoryRepository.findOne({ where: { id: parentId } });
      if (!found) {
        throw new NotFoundException('Parent category not found')
      }
      parent = found
    }

    const existing = await this.categoryRepository.findOne({ where: { name: catName } })

    const photoEntities: MediaFiles[] = [];

    if (file) {
      const validated = PhotoValidator.validator(file);
      const photoEntity = this.mediaRepository.create({
        path: FileHelper.saveFile(validated, 'category'),
        size: validated.size,
      });

      const savedPhoto = await this.mediaRepository.save(photoEntity);
      photoEntities.push(savedPhoto);
    }

    if (existing) {
      throw new ConflictException('Category name already existing !')
    }

    const category = this.categoryRepository.create({
      name: dto.name,
      description: dto.description,
      parent,
      mediaFiles: photoEntities
    })

    await this.categoryRepository.save(category)
    return category;

  }


  async updateCategory(id: number, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = dto.name ?? category.name;
    category.description = dto.description ?? category.description;

    if (file) {
      const validated = PhotoValidator.validator(file);
      const photoEntity = this.mediaRepository.create({
        path: FileHelper.saveFile(validated, 'category'),
        size: validated.size,
      });

      const savedPhoto = await this.mediaRepository.save(photoEntity);
      category.mediaFiles = [savedPhoto];
    }

    return this.categoryRepository.save(category);
  }



  findAll() {
    return this.categoryRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.remove(category);
    return { message: 'Category removed successfully' };
  }


}