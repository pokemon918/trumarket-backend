import { Field, InputType } from '@nestjs/graphql';
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
export class ProductTraceInput {
  @Field(() => ProductType)
  type: ProductType;

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

  @Field()
  price: number;

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

  @Field(() => [ProductSpecsInput])
  specs: ProductSpecsInput[];

  @Field()
  availableSpecs: LangStringI;

  @Field(() => [ProductTraceInput])
  traces: ProductTraceInput[];

  @Field(() => [String])
  certifications: string[];
}
