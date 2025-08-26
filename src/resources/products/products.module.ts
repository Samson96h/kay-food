import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFiles } from 'src/entities/media-files';
import { AuthModule } from '../auth/auth.module';
import { Product } from 'src/entities/products-entiti';
import { Category } from 'src/entities/categories-entiti';
import { Ingredient } from 'src/entities/ingredients-entiti';

@Module({
  imports: [TypeOrmModule.forFeature([Product,MediaFiles,Category,Ingredient]),
    AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
