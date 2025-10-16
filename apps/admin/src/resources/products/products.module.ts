import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product, Ingredient, Category, MediaFiles } from '../../../../../libs/common/src/database/entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from 'apps/kay-food/src/resources/auth/auth.module';
import { SharedModule } from '../../shared';


@Module({
  imports: [TypeOrmModule.forFeature([Product, MediaFiles, Category, Ingredient]),
    AuthModule,
    SharedModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
