import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhotoValidator, FileHelper } from '@app/common';
import { User, MediaFiles } from '@app/common/database/entities';
import { UpdateUserDTO } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,

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

  async findAll() {
    return await this.userRepository.find()
  }

  async removeUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    await this.userRepository.remove(user)
    return { message: "user Deleted" }
  }

}
