import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhotoValidator, FileHelper } from '@app/common/helpers';
import { User, MediaFiles, Product } from '@app/common/database';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }


  async updateUsersData(id: number, dto: UpdateUserDTO, files?: Express.Multer.File[]) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['mediaFiles'], });

    if (!user) {
      throw new NotFoundException('user not found')
    };

    user.firstName = dto.firstName ?? user.firstName;
    user.lastName = dto.lastName ?? user.lastName;
    user.age = dto.age ?? user.age;

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'user'),
          size: validated.size
        })
        user.mediaFiles.push(photoEntity)
      }
    }

    return this.userRepository.save(user)
  }


  async addFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    if (user.favorites.find((e) => e.id === product.id)) {
      return user;
    }
    user.favorites.push(product);
    return await this.userRepository.save(user);

  }

  async getFavorites(userId: number): Promise<Product[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (user && user.favorites) {
      return user.favorites;
    } else {
      return [];
    }

  }

  async removeFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) {
      throw new NotFoundException('User not found')
    };

    user.favorites = user.favorites.filter((e) => e.id !== productId);

    return await this.userRepository.save(user);
  }

}
