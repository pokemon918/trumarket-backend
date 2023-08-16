import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Company {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: LangString;

  @Prop()
  @Field()
  TaxID: string;

  @Prop()
  @Field()
  size: string; // '1-50' | '50-100' | '100-250' | 'more than 250'

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  phone: string;

  @Prop({ unique: true })
  @Field()
  email: string

  @Prop()
  @Field()
  website: string;

  @Prop()
  @Field()
  type: string; // 'Importer' | 'Wholesaler' | 'Exporter' | 'Grower' | 'Processor' | 'Trader'

  @Prop()
  @Field()
  pic_poc: string;

  @Prop()
  @Field()
  status: string; // 'approved' | 'pending' | 'verified'

  @Prop()
  @Field(() => [String])
  productIds: string[];
  
  @Field(() => Product)
  products: Product;

  @Prop()
  @Field()
  volume: number;

  @Prop()
  @Field()
  cfr_fob: number;

  @Prop()
  @Field()
  preferredPaymentTerm: string;

  @Field(() => [Int])
  @Prop()
  seasonality: number[];

  @Prop()
  @Field()
  market: string; // 'South and Central America' | 'Africa' | 'North America' | 'Europe' | 'Asia'

  @Prop()
  @Field(() => [String])
  certifications: string[];

  @Prop()
  @Field()
  ownField: boolean;
  
  @Prop()
  @Field()
  ownPackingHouse: boolean;

  @Prop()
  @Field()
  financialScore: number;
  
  @Prop()
  @Field()
  industryRef: string;
  
  @Prop()
  @Field()
  companyType: string; // 'Buyer' | 'Supplier'

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type CompanyDocument = Company & Document;

export const CompanySchema = SchemaFactory.createForClass(Company);
