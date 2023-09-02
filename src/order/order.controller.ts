import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() order: Order): Promise<Order> {
    return this.orderService.create(order);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() order: Order): Promise<Order> {
    return this.orderService.update(id, order);
  }
}
