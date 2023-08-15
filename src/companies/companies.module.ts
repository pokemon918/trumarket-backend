import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from "./schemas/company.schema";
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Company.name, schema: CompanySchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    providers: [
        CompaniesResolver,
        CompaniesService,
    ],
})
export class CompaniesModule { }
