import { Field, InputType, Int, ID } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoIdArray } from 'src/validators/is-mongo-id-array';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: LangStringI;

  @Field()
  TaxID: string;

  @Field()
  size: string; // '1-50' | '50-100' | '100-250' | 'more than 250'

  @Field()
  country: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  website: string;

  @Field()
  type: string; // 'Importer' | 'Wholesaler' | 'Exporter' | 'Grower' | 'Processor' | 'Trader'

  @Field()
  pic_poc: string;

  @Field()
  status: string; // 'approved' | 'pending' | 'verified'

  @Field(() => [ID])
  @IsMongoIdArray()
  productIds: string[];

  @Field()
  volume: number;

  @Field()
  cfr_fob: number;

  @Field()
  preferredPaymentTerm: string;

  @Field(() => [Int])
  seasonality: number[]

  @Field()
  market: string; // 'South and Central America' | 'Africa' | 'North America' | 'Europe' | 'Asia'

  @Field(() => [String])
  certifications: string[];

  @Field()
  ownField: boolean;

  @Field()
  ownPackingHouse: boolean;

  @Field()
  financialScore: number;

  @Field()
  industryRef: string;

  @Field()
  companyType: string; // 'Buyer' | 'supplier'
}
