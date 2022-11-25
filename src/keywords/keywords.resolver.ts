import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KeywordsService } from './keywords.service';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { Keyword } from './schemas/keyword.schema';
import { Public } from '../auth/decorators/public.decorator';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { UpdateKeywordInput } from './dto/update-keyword.input';

@Resolver(() => Keyword)
@HasRole(UserRole.admin)
export class KeywordsResolver {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Query(() => [Keyword])
  @Public()
  keywords() {
    return this.keywordsService.findAll();
  }

  @Query(() => Keyword)
  @Public()
  keyword(@Args('_id') _id: string) {
    return this.keywordsService.getKeyword(_id);
  }

  @Mutation(() => Keyword)
  createKeyword(@Args('input') input: CreateKeywordInput) {
    return this.keywordsService.create(input);
  }

  
  @Mutation(() => Keyword)
  updateKeyword(@Args('input') input: UpdateKeywordInput) {
    return this.keywordsService.updateKeyword(input);
  }

  @Mutation(() => Boolean)
  async deleteKeyword(@Args('_id') _id: string) {
    return this.keywordsService.deleteKeyword(_id);
  }
}
