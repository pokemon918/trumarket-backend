import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Quote {
  @Field()
  _id: string;

  @Prop()
  @Field()
  product: string;

  @Prop()
  @Field()
  companyName: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  country: string;

  @Prop({ unique: true })
  @Field()
  email: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  portOfLoading: string;

  @Prop()
  @Field()
  portOfArrival: string;

  @Prop()
  @Field()
  volume: number;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  status: string; // Approved, Rejected, Pending

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type QuoteDocument = Quote & Document;

export const QuoteSchema = SchemaFactory.createForClass(Quote);
