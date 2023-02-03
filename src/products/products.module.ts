import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { FilesModule } from 'src/files/files.module';
import {
  Category,
  CategorySchema,
} from 'src/categories/schemas/category.schema';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
