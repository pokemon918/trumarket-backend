import {
    Query,
    Args,
    Mutation,
    Resolver,
    ResolveField,
    Parent,
  } from '@nestjs/graphql';
  import { Public } from 'src/auth/decorators/public.decorator';
  import { CompaniesService } from './companies.service';
  import { CreateCompanyInput } from './dto/create-company.input';
  import { UpdateCompanyInput } from './dto/update-company.input';
  import { Company } from './schemas/company.schema';
  import { HasRole } from 'src/auth/decorators/has-role.decorator';
  import { UserRole } from 'src/users/schemas/user.schema';
  import { LangSearchI } from 'src/global/dto/lang-search.input';
  import { Product } from 'src/products/schemas/product.schema';
  
  @Resolver(() => Quote)
  @HasRole(UserRole.admin)
  export class QuoteResolver {
    constructor(private readonly quoteService: QuoteService) {}
  
  
    @Query(() => Quote, { nullable: true })
    @Public()
    quote(@Args('_id') _id: string) {
      return this.quoteService.getQuote(_id);
    }
  
    @Mutation(() => Quote)
    createQuote(@Args('input') input: CreateCompanyInput) {
      return this.quoteService.createQuote(input);
    }
  
    @Mutation(() => Quote)
    updateQuote(@Args('input') input: UpdateCompanyInput) {
      return this.quoteService.updateQuote(input);
    }
  
    @Mutation(() => Boolean)
    async deleteQuote(@Args('_id') _id: string) {
      return this.quoteService.deleteQuote(_id);
    }
  }
  