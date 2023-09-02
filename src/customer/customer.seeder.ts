import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import * as faker from 'faker';
import { Company } from '../company/company.schema';
import { OrderSeederService } from '../order/order.seeder';

@Injectable()
export class CustomerSeederService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    private readonly orderSeeder: OrderSeederService,
  ) {}

  async seed(companies: Company[]) {
    const customers = Array(10)
      .fill(null)
      .map(() => ({
        name: faker.name.findName(),
        company: faker.random.arrayElement(companies)._id,
        orders: [], // will be populated later
        totalOrders: faker.random.number({ min: 1, max: 10 }),
      }));

    const createdCustomers = await this.customerModel.insertMany(customers);

    await this.orderSeeder.seed(createdCustomers);
  }

  async drop() {
    return this.customerModel.deleteMany({});
  }
}
