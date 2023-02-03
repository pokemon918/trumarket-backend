import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './schemas/category.schema';
import { Public } from '../auth/decorators/public.decorator';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Product } from 'src/products/schemas/product.schema';

@Resolver(() => Category)
@HasRole(UserRole.admin)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  @Public()
  categories() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category)
  @Public()
  category(@Args('_id') _id: string) {
    return this.categoriesService.getCategory(_id);
  }

  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoriesService.create(input);
  }

  @Mutation(() => Category)
  updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoriesService.updateCategory(input);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('_id') _id: string) {
    return this.categoriesService.deleteCategory(_id);
  }

  @ResolveField(() => Product)
  async products(@Parent() { _id }: Category) {
    return this.categoriesService.getCategoryProducts(_id);
  }
}
