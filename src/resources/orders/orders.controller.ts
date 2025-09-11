import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { OrderDto } from './dto/create-order.dto';
import { UserRole } from 'src/entities/enums/role.enum';

@UseGuards(AuthGuard,RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  async addOrder(@Body() dto: OrderDto, @Req() req: any) {
    const user = req.user;
    return this.ordersService.create(dto, user);
  }

  @Get('my')
  async getMyOrders(@Req() req: any) {
    const user = req.user;
    return this.ordersService.findMyOrders(user.id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.ordersService.removeOrder(id);
  }

}
