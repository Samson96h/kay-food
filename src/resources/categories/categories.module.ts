import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller'; 
import { Category, MediaFiles, User } from '../../entities';
import { CategoriesService } from './categories.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles]),
    AuthModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule { }
