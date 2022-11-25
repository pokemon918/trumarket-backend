import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { FilesModule } from 'src/files/files.module';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema }
    ]),
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
