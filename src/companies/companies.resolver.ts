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
  
  @Resolver(() => Company)
  @HasRole(UserRole.admin)
  export class CompaniesResolver {
    constructor(private readonly companiesService: CompaniesService) {}
  
    @Query(() => [Company])
    @Public()
    companies(
      @Args('nameSearch', { nullable: true }) nameSearch?: LangSearchI,
      @Args('productId', { nullable: true }) productId?: string,
      @Args('descCreatedAt', { nullable: true }) descCreatedAt?: boolean,
      @Args('companyType', { nullable: true }) companyType?: string,
    ) {
      return this.companiesService.getCompanies(
        nameSearch,
        productId,
        descCreatedAt,
        companyType,
      );
    }
  
    @Query(() => Company, { nullable: true })
    @Public()
    company(@Args('_id') _id: string) {
      return this.companiesService.getCompany(_id);
    }
  
    @Mutation(() => Company)
    createCompany(@Args('input') input: CreateCompanyInput) {
      return this.companiesService.createCompany(input);
    }
  
    @Mutation(() => Company)
    updateCompany(@Args('input') input: UpdateCompanyInput) {
      return this.companiesService.updateCompany(input);
    }
  
    @Mutation(() => Boolean)
    async deleteCompany(@Args('_id') _id: string) {
      return this.companiesService.deleteCompany(_id);
    }
  
    @ResolveField(() => Product)
    async category(@Parent() { productIds }: Company) {
      return this.companiesService.getCompanyProduct(productIds[0]);
    }
  }
  