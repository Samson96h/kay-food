import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { OrderDto } from './dto/create-order.dto';
import { UserRole } from 'src/entities/enums/role.enum';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { IdDTO } from 'src/dto/id-param.dto';

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
  async addOrder(@Body() dto: OrderDto, @AuthUser() user: any) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('my')
  async getMyOrders(@AuthUser() user: any) {
    return this.ordersService.findMyOrders(user.id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteOrder(@Param() param :IdDTO ) {
    return this.ordersService.removeOrder(param.id);
  }

}
