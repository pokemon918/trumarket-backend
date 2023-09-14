import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Quote {
  @Field()
  _id: string;

  @Prop()
  @Field()
  productId: string;

  @Field(() => Product)
  product: Product;

  @Prop()
  @Field()
  companyName: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  phone: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  portOfLoading?: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  portOfArrival?: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  paymentTerms?: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  rfqStatus?: Record<string, any>;

  @Prop()
  @Field()
  volume: number;

  @Prop()
  @Field()
  SpecifyDetails: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type QuoteDocument = Quote & Document;

export const QuoteSchema = SchemaFactory.createForClass(Quote);
