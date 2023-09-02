import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { OrderStatus } from './order.enum';
import * as faker from 'faker';
import { Customer } from '../customer/customer.schema';

@Injectable()
export class OrderSeederService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async seed(customers: Customer[]) {
    const orders = Array(20)
      .fill(null)
      .map(() => {
        const numProducts = faker.random.number({ min: 1, max: 5 });
        const productSet = new Set<string>();

        while (productSet.size < numProducts) {
          productSet.add(faker.commerce.product());
        }

        const products = [...productSet];

        return {
          name: faker.name.findName(),
          products: products,
          status: faker.random.arrayElement(Object.values(OrderStatus)),
          price: faker.commerce.price(),
          createdDate: faker.date.recent(),
        };
      });

    orders.forEach((order) => {
      // @ts-ignore
      order.customer = faker.random.arrayElement(customers)._id;
    });

    await this.orderModel.insertMany(orders);
  }

  async drop() {
    return this.orderModel.deleteMany({});
  }
}
