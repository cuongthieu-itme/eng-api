import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator';

@Roles(Role.ADMIN)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create() {
    return this.ordersService.create();
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
