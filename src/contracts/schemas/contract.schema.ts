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
  @Field({ nullable: true })
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
  @Field({ nullable: true })
  duration: number; // weeks 

  @Prop()
  @Field({ nullable: true })
  risk: string; // ['A', 'B', 'C', 'D']

  @Prop()
  @Field({ nullable: true })
  return: string; // (percentage) or (annual return)

  @Prop()
  @Field({ nullable: true })
  supplierId: string;

  @Field(() => User)
  supplier: User;

  @Prop()
  @Field({ nullable: true })
  requiredAmount: number;

  @Prop()
  @Field({ nullable: true })
  nftLink: string; // website link

  @Prop()
  @Field({ nullable: true })
  capitalFunded: number; // money => refer to step (3): Contract is visible for investors 

  @Prop()
  @Field({ nullable: true })
  approvedDate: Date;

  @Prop()
  @Field()
  expirationDate: Date;
  
  @Prop()
  @Field({ nullable: true })
  investedAmount: number; // (user input)

  @Prop()
  @Field({ nullable: true })
  paymentMethod: string;

  @Prop()
  @Field({ nullable: true })
  fundedDate: Date;

  @Prop()
  @Field()
  status: string; // 'Pending', 'Expired', 'Rejected', 'Funded', 'Approved'.

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ContractDocument = Contract & Document;

export const ContractSchema = SchemaFactory.createForClass(Contract);
