import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from "src/users/schemas/user.schema";
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Contract {
  @Field()
  _id: string;

  @Prop()
  @Field()
  productId: string;

  @Field(() => Product)
  product: Product;

  @Prop()
  @Field()
  isExisting: boolean;

  @Prop()
  @Field()
  portOfLoading: string;

  @Prop()
  @Field()
  portOfArrival: string;

  @Prop()
  @Field()
  departureDate: Date;

  @Prop()
  @Field()
  offerPrice: number;

  @Prop()
  @Field()
  unit: string;

  @Prop()
  @Field()
  quantity: number;

  @Prop()
  @Field()
  downPayment: number;

  @Prop()
  @Field()
  cashAgainstDocuments: number;

  @Prop()
  @Field()
  arrival: number;

  @Prop()
  @Field()
  description: LangString;

  @Prop()
  @Field()
  attachment: string;

  @Prop()
  @Field()
  brandType: boolean;

  @Prop()
  @Field()
  pluType: boolean;

  @Prop()
  @Field(() => [String])
  certifications: [string];

  @Prop()
  @Field()
  measure: boolean;

  @Prop()
  @Field()
  duration: number; // weeks 

  @Prop()
  @Field()
  risk: string; // ['A', 'B', 'C', 'D']

  @Prop()
  @Field()
  return: string; // (percentage) or (annual return)

  @Prop()
  @Field()
  supplierId: string;

  @Field(() => User)
  supplier: User;

  @Prop()
  @Field()
  requiredAmount: number;

  @Prop()
  @Field()
  nftLink: string; // website link

  @Prop()
  @Field()
  capitalFunded: number; // money => refer to step (3): Contract is visible for investors 

  @Prop()
  @Field()
  approvedDate: Date;
  
  @Prop()
  @Field()
  investedAmount: number; // (user input)

  @Prop()
  @Field()
  paymentMethod: string;

  @Prop()
  @Field()
  fundedDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ContractDocument = Contract & Document;

export const ContractSchema = SchemaFactory.createForClass(Contract);
