import { QuoteService } from './quote.service';
import { QuoteResolver } from './quote.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from "./schemas/quote.schema";
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Quote.name, schema: QuoteSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    providers: [
        QuotesResolver,
        QuotesService,
    ],
})
export class QuoteModule { }
