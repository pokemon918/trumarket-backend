import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './schemas/product.schema';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  @Public()
  products() {
    return this.productsService.getProducts();
  }

  @Query(() => Product)
  @Public()
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
  
  @Mutation(() => Boolean)
  async deleteProduct(@Args('_id') _id: string) {
    return this.productsService.deleteProduct(_id);
  }
}
