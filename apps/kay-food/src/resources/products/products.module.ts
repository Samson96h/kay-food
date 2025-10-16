import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product, Ingredient, Category, MediaFiles } from '@app/common/database';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product, MediaFiles, Category, Ingredient]),
    AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
