import {
    Query,
    Args,
    Mutation,
    Resolver,
    ResolveField,
    Parent,
  } from '@nestjs/graphql';
  import { Public } from 'src/auth/decorators/public.decorator';
  import { ContractsService } from './contracts.service';
  import { CreateContractInput } from './dto/create-contract.input';
  import { UpdateContractInput } from './dto/update-contract.input';
  import { Contract } from './schemas/contract.schema';
//   import { HasRole } from 'src/auth/decorators/has-role.decorator';
//   import { UserRole } from 'src/users/schemas/user.schema';
//   import { LangSearchI } from 'src/global/dto/lang-search.input';
import { Product } from 'src/products/schemas/product.schema';
  
  @Resolver(() => Contract)
//   @HasRole(UserRole.admin)
  export class ContractsResolver {
    constructor(private readonly contractsService: ContractsService) {}
  
    @Query(() => [Contract])
    @Public()
    contracts(
    //   @Args('nameSearch', { nullable: true }) nameSearch?: LangSearchI,
      @Args('productId', { nullable: true }) productId?: string,
      @Args('descCreatedAt', { nullable: true }) descCreatedAt?: boolean,
      @Args('isExisting', { nullable: true }) isExisting?: boolean,
    ) {
      return this.contractsService.getContracts(
        // nameSearch,
        productId,
        descCreatedAt,
        isExisting,
      );
    }

    @Query(() => [Number])
    @Public()
    contractStatistics() {
      return this.contractsService.getStatistics()
    }
  
    @Query(() => Contract, { nullable: true })
    @Public()
    contract(@Args('_id') _id: string) {
      return this.contractsService.getContract(_id);
    }
  
    @Mutation(() => Contract)
    createContract(@Args('input') input: CreateContractInput) {
      return this.contractsService.createContract(input);
    }
  
    @Mutation(() => Contract)
    updateContract(@Args('input') input: UpdateContractInput) {
      return this.contractsService.updateContract(input);
    }
  
    @Mutation(() => Boolean)
    async deleteContract(@Args('_id') _id: string) {
      return this.contractsService.deleteContract(_id);
    }
  
    @ResolveField(() => Product)
    async product(@Parent() { productId }: Contract) {
      return this.contractsService.getContractProduct(productId);
    }
  }
  