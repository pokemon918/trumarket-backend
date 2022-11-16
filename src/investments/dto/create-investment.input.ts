import { Field, InputType } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { InvestmentType } from '../schemas/investment.schema';

@InputType()
export class InvestmentSpecsInput {
  @Field()
  name: LangStringI;

  @Field()
  value: LangStringI;
}

@InputType()
export class InvestmentTraceInput {
  @Field(() => InvestmentType)
  type: InvestmentType;

  @Field()
  description: LangStringI;

  @Field(() => [String])
  gallery: string[];
}

@InputType()
export class CreateInvestmentInput {
  @Field()
  name: LangStringI;

  @Field()
  categoryId: string;

  @Field()
  country: string;

  @Field()
  hsCode: LangStringI;

  @Field()
  estimatedReturn: number;

  @Field()
  goalAmount: number;

  @Field()
  paidAmount: number;

  @Field()
  supporters: number;

  @Field()
  finalDate: string;

  @Field()
  bigTitle: LangStringI;

  @Field()
  description: LangStringI;

  @Field()
  offerPrices: LangStringI;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  gallery: string[];

  @Field(() => [InvestmentSpecsInput])
  specs: InvestmentSpecsInput[];

  @Field()
  availableSpecs: LangStringI;

  @Field(() => [InvestmentTraceInput])
  traces: InvestmentTraceInput[];

  @Field(() => [String])
  certifications: string[];
}
