import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSeederService } from './customer.seeder';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    OrderModule,
  ],
  providers: [CustomerService, CustomerSeederService],
  controllers: [CustomerController],
  exports: [CustomerSeederService],
})
export class CustomerModule {}
