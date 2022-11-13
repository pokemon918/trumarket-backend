import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
export class ProductSpecs {
  @Field()
  name: LangString;

  @Field()
  value: LangString;
}

export enum ProductType {
  field = 'field',
  packing = 'packing',
  finalProduct = 'finalProduct',
}

registerEnumType(ProductType, { name: 'ProductType' });

@ObjectType()
export class ProductTrace {
  @Field(() => ProductType)
  type: ProductType;

  @Field()
  description: LangString;

  @Field(() => [String])
  gallery: string;
}

@ObjectType()
@Schema()
export class Product {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: LangString;

  @Prop({ type: Types.ObjectId })
  @Field()
  categoryId: string;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  hsCode: LangString;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  bigTitle: LangString;

  @Prop()
  @Field()
  description: LangString;

  @Prop()
  @Field()
  offerPrices: LangString;

  @Prop()
  @Field()
  thumbnail: string;

  @Prop()
  @Field(() => [String])
  gallery: string[];

  @Prop()
  @Field(() => [ProductSpecs])
  specs: ProductSpecs[];

  @Prop()
  @Field(() => [ProductTrace])
  traces: ProductTrace[];

  @Prop()
  @Field(() => [String])
  certifications: string[];
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
