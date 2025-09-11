import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Order } from 'src/entities/orders-entiti';
import { Product } from 'src/entities/products-entiti';
import { User } from 'src/entities/users-entiti';
import { OrderItem } from 'src/entities/order-item';
import { OrderDto } from './dto/create-order.dto';
import { Ingredient } from 'src/entities/ingredients-entiti';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) { }

  async create(dto: OrderDto, user: User): Promise<Order> {
    const order = this.orderRepository.create({
      user,
      totalPrice: 0,
      items: [],
    });

    for (const item of dto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      let ingredients: Ingredient[] = [];
      if (item.ingredientIds?.length) {
        ingredients = await this.ingredientRepository.findBy({
          id: In(item.ingredientIds),
        });
        if (ingredients.length !== item.ingredientIds.length) {
          throw new NotFoundException('One or more ingredients not found');
        }
      }

      const productPrice = Number(product.price);
      const ingredientCost = ingredients.reduce(
        (sum, ing) => sum + Number(ing.price),
        0,
      );
      const itemPrice = (productPrice + ingredientCost) * item.quantity;

      const orderItem = this.orderItemRepository.create({
        order,
        product,
        ingredients,
        quantity: item.quantity,
        price: itemPrice,
      });

      order.items.push(orderItem);
    }

    order.totalPrice = order.items.reduce((sum, i) => sum + i.price, 0);

    return await this.orderRepository.save(order);
  }


  async findMyOrders(id: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id } },
      relations: ['items.product', 'items.ingredients'],
    });
  }


  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user','items.product', 'items.ingredients'],
    });
  }

  async removeOrder(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.remove(order);
    return {
      message: 'Order successfully deleted'
    }
  }
}
