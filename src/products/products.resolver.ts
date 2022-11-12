import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './schemas/dto/create-product.input';
import { UpdateProductInput } from './schemas/dto/update-product.input';
import { Product } from './schemas/product.schema';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.getProducts();
  }

  @Query(() => Product)
  product(@Args('_id') _id: string) {
    return this.productsService.getProduct(_id);
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.createProduct(input);
  }

  @Mutation(() => Product)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productsService.updateProduct(input);
  }
}
