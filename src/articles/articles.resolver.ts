import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { Public } from 'src/auth/decorators/public.decorator';
import { LangSearchI } from 'src/global/dto/lang-search.input';

@Resolver(() => Article)
@HasRole(UserRole.admin)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(() => [Article])
  @Public()
  articles(
    @Args('titleSearch', { nullable: true }) titleSearch?: LangSearchI,
    @Args('keywordId', { nullable: true }) keywordId?: string,
  ) {
    return this.articlesService.findAll(titleSearch, keywordId);
  }

  @Query(() => Article)
  @Public()
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

  @Mutation(() => Boolean)
  async deleteArticle(@Args('_id') _id: string) {
    return this.articlesService.delete(_id);
  }
}
