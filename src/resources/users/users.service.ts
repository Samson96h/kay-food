import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users-entiti';
import { Repository } from 'typeorm';
import { MediaFiles } from 'src/entities/media-files';
import { PhotoValidator } from 'src/helpers/photos-validator-helper';
import { FileHelper } from 'src/helpers/file-helper';
import { UserRole } from 'src/entities/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>
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

  async addAdmin(id:number){
  const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    user.roles = UserRole.ADMIN
    return this.userRepository.save(user)
  }


  async removeAdmin(id:number){
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    user.roles = UserRole.USER
    return this.userRepository.save(user)
  }



}



