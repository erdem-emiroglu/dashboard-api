import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomerSeederService } from './customer/customer.seeder';
import { OrderSeederService } from './order/order.seeder';
import { CompanySeederService } from './company/company.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const customerSeeder = app.get(CustomerSeederService);
  const orderSeeder = app.get(OrderSeederService);
  const companySeeder = app.get(CompanySeederService);

  await customerSeeder.drop();
  await orderSeeder.drop();
  await companySeeder.drop();

  await companySeeder.seed();

  console.log('Seeding completed!');
  await app.close();
}

bootstrap();
