import { Field, InputType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { LangStringI } from 'src/global/dto/lang-string.input';
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
@Schema()
export class CreateProductInput {
  @Prop()
  @Field()
  name: LangStringI;

  @Prop()
  @Field()
  categoryId: string;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  hsCode: LangStringI;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  bigTitle: LangStringI;

  @Prop()
  @Field()
  description: LangStringI;

  @Prop()
  @Field()
  offerPrices: LangStringI;

  @Prop()
  @Field()
  thumbnail: string;

  @Prop()
  @Field(() => [String])
  gallery: string[];

  @Prop()
  @Field(() => [ProductSpecsInput])
  specs: ProductSpecsInput[];

  @Field()
  availableSpecs: LangStringI;

  @Prop()
  @Field(() => [ProductTraceInput])
  traces: ProductTraceInput[];

  @Prop()
  @Field(() => [String])
  certifications: string[];
}
