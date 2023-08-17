import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
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

@ObjectType()
export class ProductOfferPrice {
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
  @Field()
  title: LangString;

  @Field()
  description: LangString;

  @Field(() => [String])
  gallery: string[];
}

@ObjectType()
@Schema({ timestamps: true })
export class Product {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: LangString;

  @Prop()
  @Field()
  categoryId: string;

  @Field(() => Category)
  category: Category;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  hsCode: LangString;

  @Prop()
  @Field(() => [Int])
  harvestingMonths: number[]

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  isSustainable: boolean;

  @Prop()
  @Field()
  bigTitle: LangString;

  @Prop()
  @Field()
  description: LangString;

  @Prop()
  @Field(() => [ProductOfferPrice])
  offerPrices: ProductOfferPrice;

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
  @Field()
  availableSpecs: LangString;

  @Prop()
  @Field(() => [ProductTrace])
  traces: ProductTrace[];

  @Prop()
  @Field(() => [String])
  certifications: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
