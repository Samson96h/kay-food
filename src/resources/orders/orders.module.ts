import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item';
import { Order } from 'src/entities/orders-entiti';
import { Product } from 'src/entities/products-entiti';
import { Ingredient } from 'src/entities/ingredients-entiti';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderItem,Ingredient]),
    JwtModule.register({})
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
