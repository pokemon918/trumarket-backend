import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentInput } from './dto/create-investment.input';
import { UpdateInvestmentInput } from './dto/update-investment.input';
import { Investment } from './schemas/investment.schema';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { LangSearchI } from 'src/global/dto/lang-search.input';

@Resolver(() => Investment)
@HasRole(UserRole.admin)
export class InvestmentsResolver {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Query(() => [Investment])
  @Public()
  investments(
    @Args('nameSearch', { nullable: true }) nameSearch?: LangSearchI,
    @Args('categoryId', { nullable: true }) categoryId?: string,
    @Args('descCreatedAt', { nullable: true }) descCreatedAt?: boolean,
  ) {
    return this.investmentsService.getInvestments(
      nameSearch,
      categoryId,
      descCreatedAt,
    );
  }

  @Query(() => Investment)
  @Public()
  investment(@Args('_id') _id: string) {
    return this.investmentsService.getInvestment(_id);
  }

  @Mutation(() => Investment)
  createInvestment(@Args('input') input: CreateInvestmentInput) {
    return this.investmentsService.createInvestment(input);
  }

  @Mutation(() => Investment)
  updateInvestment(@Args('input') input: UpdateInvestmentInput) {
    return this.investmentsService.updateInvestment(input);
  }

  @Mutation(() => Boolean)
  async deleteInvestment(@Args('_id') _id: string) {
    return this.investmentsService.deleteInvestment(_id);
  }
}
