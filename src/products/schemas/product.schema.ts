import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

@ObjectType()
export class ProductSpecs {
  @Field()
  name: string;

  @Field()
  value: string;
}

@ObjectType()
export class ProductTrace {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  description: string;

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
  name: string;

  @Prop({ type: Types.ObjectId })
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
