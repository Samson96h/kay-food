import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { OrderItem, Order, Product, Ingredient, User, Zone } from '@app/common/database';
import { OrderDto } from './dto/create-order.dto';
const inside = require('point-in-polygon');


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) { }

  // async create(dto: OrderDto, userId: number): Promise<Order> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) throw new NotFoundException('User not found');

  //   const order = this.orderRepository.create({
  //     user,
  //     totalPrice: 0,
  //     items: [],
  //   });

  //   let deliveryFee = 0;


  //   if (dto.delivery) {
  //     if (dto.x == null || dto.y == null) {
  //       throw new BadRequestException('Coordinates are required for delivery');
  //     }

  //     const zones = await this.zoneRepository.find();
  //     const point = [dto.x, dto.y];

  //     const inZone = zones.some(zone =>
  //       inside(point, zone.perimeter.map(p => [p.x, p.y]))
  //     );

  //     if (!inZone) {
  //       throw new BadRequestException('Delivery to this area is not available.');
  //     }

  //     deliveryFee = 300;
  //   }


  //   for (const item of dto.items) {
  //     const product = await this.productRepository.findOne({
  //       where: { id: item.productId },
  //     });
  //     if (!product) {
  //       throw new NotFoundException(`Product ${item.productId} not found`);
  //     }

  //     let ingredients: Ingredient[] = [];
  //     if (item.ingredientIds?.length) {
  //       ingredients = await this.ingredientRepository.findBy({
  //         id: In(item.ingredientIds),
  //       });
  //       if (ingredients.length !== item.ingredientIds.length) {
  //         throw new NotFoundException('One or more ingredients not found');
  //       }
  //     }

  //     const productPrice = Number(product.price);
  //     const ingredientCost = ingredients.reduce(
  //       (sum, ing) => sum + Number(ing.price),
  //       0,
  //     );
  //     const itemPrice = (productPrice + ingredientCost) * item.quantity;

  //     const orderItem = this.orderItemRepository.create({
  //       order,
  //       product,
  //       ingredients,
  //       quantity: item.quantity,
  //       price: itemPrice,
  //       delivery: dto.delivery || false,
  //     });

  //     order.items.push(orderItem);
  //   }

  //   order.totalPrice = order.items.reduce((sum, i) => sum + i.price, 0) + deliveryFee;

  //   return await this.orderRepository.save(order);
  // }



  // async findMyOrders(id: number): Promise<Order[]> {
  //   return await this.orderRepository.find({
  //     where: { user: { id } },
  //     relations: ['items.product', 'items.ingredients'],
  //   });
  // }


  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'items.product', 'items.ingredients'],
    });
  }

  // async removeOrder(id: number) {
  //   const order = await this.orderRepository.findOne({ where: { id } });
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   await this.orderRepository.remove(order);
  //   return {
  //     message: 'Order successfully deleted'
  //   }
  // }
}
