import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Category, MediaFiles, User } from '@app/common/database';
import { CategoriesController } from './categories.controller'; 
import { CategoriesService } from './categories.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles]),
    AuthModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule { }
