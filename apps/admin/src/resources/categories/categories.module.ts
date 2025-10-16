import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from 'apps/kay-food/src/resources/auth/auth.module';
import { Category, MediaFiles, User } from '@app/common/database';
import { CategoriesController } from './categories.controller'; 
import { CategoriesService } from './categories.service';
import { SharedModule } from '../../shared';


@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles]),
    AuthModule,
    SharedModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule { }
