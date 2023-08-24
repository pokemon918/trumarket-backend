import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsResolver } from './contracts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract, ContractSchema } from './schemas/contract.schema';
import { FilesModule } from 'src/files/files.module';
import {
  Product,
  ProductSchema,
} from 'src/products/schemas/product.schema';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ContractsResolver, ContractsService]
})
export class ContractsModule {}
