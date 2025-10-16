import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminAuthGuard } from '@app/common';
import { OrdersService } from './orders.service';


@UseGuards(AdminAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // @Post()
  // async addOrder(@Body() dto: OrderDto, @AuthUser() user: IRequestUser) {
  //   return this.ordersService.create(dto, user.id);
  // }


  // @Get('my')
  // async getMyOrders(@AuthUser() user: IRequestUser) {
  //   return this.ordersService.findMyOrders(user.id);
  // }

  // @Delete(':id')
  // async deleteOrder(@Param() param: IdDTO) {
  //   return this.ordersService.removeOrder(param.id);
  // }

}
