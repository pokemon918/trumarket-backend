import { Field, InputType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@InputType()
export class ProductSpecsInput {
  @Field()
  name: string;

  @Field()
  value: string;
}

@InputType()
export class ProductTraceInput {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String])
  gallery: string;
}

@InputType()
@Schema()
export class CreateProductInput {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  categoryId: string;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  hsCode: string;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  bigTitle: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  offerPrices: string;

  @Prop()
  @Field()
  thumbnail: string;

  @Prop()
  @Field(() => [String])
  gallery: string[];

  @Prop()
  @Field(() => [ProductSpecsInput])
  specs: ProductSpecsInput[];

  @Prop()
  @Field(() => [ProductTraceInput])
  traces: ProductTraceInput[];

  @Prop()
  @Field(() => [String])
  certifications: string[];
}
