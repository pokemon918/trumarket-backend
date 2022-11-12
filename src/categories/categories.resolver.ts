import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './schemas/category.schema';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  categories() {
    return this.categoriesService.findAll();
  }

  @Mutation(() => Category)
  createCategory(
    @Args('input') input: CreateCategoryInput,
  ) {
    return this.categoriesService.create(input);
  }
}
