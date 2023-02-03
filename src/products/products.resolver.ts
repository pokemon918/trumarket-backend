import {
  Query,
  Args,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './schemas/product.schema';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { LangSearchI } from 'src/global/dto/lang-search.input';
import { Category } from 'src/categories/schemas/category.schema';

@Resolver(() => Product)
@HasRole(UserRole.admin)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  @Public()
  products(
    @Args('nameSearch', { nullable: true }) nameSearch?: LangSearchI,
    @Args('categoryId', { nullable: true }) categoryId?: string,
  ) {
    return this.productsService.getProducts(nameSearch, categoryId);
  }

  @Query(() => Product, { nullable: true })
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

  @ResolveField(() => Category)
  async category(@Parent() { categoryId }: Product) {
    return this.productsService.getProductCategory(categoryId);
  }
}
