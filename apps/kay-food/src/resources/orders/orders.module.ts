import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { OrderItem, Order, Product, Ingredient, User, Zone } from '@app/common/database';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderItem,Ingredient, User, Zone]),
    JwtModule.register({})
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
