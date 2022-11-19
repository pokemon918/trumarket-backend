import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
export class InvestmentSpecs {
  @Field()
  name: LangString;

  @Field()
  value: LangString;
}

export enum InvestmentType {
  field = 'field',
  packing = 'packing',
  finalProduct = 'finalProduct',
}

registerEnumType(InvestmentType, { name: 'InvestmentType' });

@ObjectType()
export class InvestmentTrace {
  @Field(() => InvestmentType)
  type: InvestmentType;

  @Field()
  description: LangString;

  @Field(() => [String])
  gallery: string[];
}

@ObjectType()
@Schema({ timestamps: true })
export class Investment {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: LangString;

  @Prop({ type: Types.ObjectId })
  @Field()
  categoryId: string;

  @Field()
  category: Category;

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  hsCode: LangString;

  @Prop()
  @Field()
  goalAmount: number;

  @Prop()
  @Field()
  paidAmount: number;

  @Prop()
  @Field()
  estimatedReturn: number;

  @Prop()
  @Field()
  supporters: number;

  @Prop()
  @Field()
  finalDate: string;

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
  @Field(() => [InvestmentSpecs])
  specs: InvestmentSpecs[];

  @Prop()
  @Field()
  availableSpecs: LangString;

  @Prop()
  @Field(() => [InvestmentTrace])
  traces: InvestmentTrace[];

  @Prop()
  @Field(() => [String])
  certifications: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type InvestmentDocument = Investment & Document;

export const InvestmentSchema = (() => {
  const schema = SchemaFactory.createForClass(Investment);

  schema.virtual('category', {
    ref: Category.name,
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
  });

  return schema;
})();
