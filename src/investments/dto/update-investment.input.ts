import { CreateInvestmentInput } from './create-investment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvestmentInput extends PartialType(CreateInvestmentInput) {
  @Field()
  _id: string;
}
