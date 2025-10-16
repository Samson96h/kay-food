import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthUser } from '@app/common';
import { AuthGuard } from '../../../../../libs/common/src/guards';
import { IRequestUser } from '../users/models/request-user';
import { OrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { IdDTO } from '@app/common';


@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: IRequestUser) {
    return this.ordersService.create(dto, user.id);
  }


  @Get('my')
  async getMyOrders(@AuthUser() user: IRequestUser) {
    return this.ordersService.findMyOrders(user.id);
  }

}
