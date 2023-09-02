import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }
}
