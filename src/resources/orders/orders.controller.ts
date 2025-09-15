import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Roles, RolesGuard, AuthGuard } from '../../guards';
import { UserRole } from 'src/entities/enums/role.enum';
import { OrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { IdDTO } from 'src/dto/id-param.dto';
import { IRequestUser } from '../users/models/request-user';

@UseGuards(AuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: IRequestUser) {
    return this.ordersService.create(dto, user.id);
  }


  @Get('my')
  async getMyOrders(@AuthUser() user: IRequestUser) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteOrder(@Param() param: IdDTO) {
    return this.ordersService.removeOrder(param.id);
  }

}
