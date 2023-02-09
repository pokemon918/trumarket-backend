import { Field, InputType, Int } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoId } from 'src/validators/is-mongo-id';
import { InvestmentType } from '../schemas/investment.schema';

@InputType()
export class InvestmentSpecsInput {
  @Field()
  name: LangStringI;

  @Field()
  value: LangStringI;
}

@InputType()
export class InvestmentOfferPriceInput {
  @Field()
  name: LangStringI;

  @Field()
  value: LangStringI;
}

@InputType()
export class InvestmentTraceInput {
  @Field()
  title: LangStringI;

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
  @IsMongoId()
  categoryId: string;

  @Field()
  country: string;

  @Field()
  hsCode: LangStringI;

  @Field(() => [Int])
  harvestingMonths: number[];

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

  @Field(() => [InvestmentOfferPriceInput])
  offerPrices: InvestmentOfferPriceInput[];

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
