import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }
}
