import { Field, InputType, Int } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoId } from 'src/validators/is-mongo-id';
import { ProductType } from '../schemas/product.schema';

@InputType()
export class ProductSpecsInput {
  @Field()
  name: LangStringI;

  @Field()
  value: LangStringI;
}

@InputType()
export class ProductOfferPriceInput {
  @Field()
  name: LangStringI;

  @Field()
  value: LangStringI;
}

@InputType()
export class ProductTraceInput {
  @Field()
  title: LangStringI;

  @Field()
  description: LangStringI;

  @Field(() => [String])
  gallery: string[];
}

@InputType()
export class CreateProductInput {
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
  price: number;

  @Field()
  isSustainable: boolean;

  @Field()
  bigTitle: LangStringI;

  @Field()
  description: LangStringI;

  @Field(() => [ProductOfferPriceInput])
  offerPrices: ProductOfferPriceInput[];

  @Field()
  thumbnail: string;

  @Field(() => [String])
  gallery: string[];

  @Field(() => [ProductSpecsInput])
  specs: ProductSpecsInput[];

  @Field()
  availableSpecs: LangStringI;

  @Field(() => [ProductTraceInput])
  traces: ProductTraceInput[];

  @Field(() => [String])
  certifications: string[];
}
