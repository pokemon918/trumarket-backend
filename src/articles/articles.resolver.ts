import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(() => [Article])
  articles() {
    return this.articlesService.findAll();
  }

  @Query(() => Article)
  article(@Args('_id') _id: string) {
    return this.articlesService.findOne(_id);
  }

  @Mutation(() => Article)
  createArticle(@Args('input') input: CreateArticleInput) {
    return this.articlesService.create(input);
  }

  @Mutation(() => Article)
  updateArticle(@Args('input') input: UpdateArticleInput) {
    return this.articlesService.update(input);
  }

  @Mutation(() => Article)
  async deleteArticle(@Args('_id') _id: string) {
    return this.articlesService.delete(_id);
  }
}
