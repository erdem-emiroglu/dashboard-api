import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.schema';
import * as faker from 'faker';
import { CustomerSeederService } from '../customer/customer.seeder';

@Injectable()
export class CompanySeederService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    private readonly customerSeeder: CustomerSeederService,
  ) {}

  async seed() {
    const companies = Array(5)
      .fill(null)
      .map(() => ({
        name: faker.company.companyName(),
        mail: faker.internet.email(),
        customers: [], // This will be an array of customer IDs. You may want to populate this with real customer IDs
        orders: [], // Similarly, array of order IDs
        totalRevenue: faker.finance.amount(),
        profits: {
          thisWeek: faker.finance.amount(),
          thisMonth: faker.finance.amount(),
          thisYear: faker.finance.amount(),
        },
      }));

    const createdCompanies = await this.companyModel.insertMany(companies);

    await this.customerSeeder.seed(createdCompanies);
  }

  async drop() {
    return this.companyModel.deleteMany({});
  }
}
