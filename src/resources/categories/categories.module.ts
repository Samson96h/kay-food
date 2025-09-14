import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller'; 
import { Category, MediaFiles, User } from 'src/entities';
import { CategoriesService } from './categories.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles]),
    AuthModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule { }
