import { Field, InputType, Int } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoId } from 'src/validators/is-mongo-id';

@InputType()
export class CreateContractInput {
  @Field()
  _id: string;

  @Field()
  @IsMongoId()
  productId: string;

  @Field()
  portOfLoading: string;

  @Field()
  portOfArrival: string;

  @Field()
  departureDate: Date;

  @Field()
  offerPrice: number;

  @Field()
  quantity: number;

  @Field()
  downPayment: number;

  @Field()
  cashAgainstDocuments: number;

  @Field()
  arrival: number;

  @Field()
  description: LangStringI;

  @Field()
  attachment: string;

  @Field()
  duration: number; // weeks 

  @Field()
  risk: string; // ['A', 'B', 'C', 'D']

  @Field()
  Return: string; // (percentage) or (annual return)

  @Field()
  supplierId: string;

  @Field()
  requiredAmount: number;

  @Field()
  nftLink: string; // website link

  @Field()
  capitalFunded: number; // money => refer to step (3): Contract is visible for investors 

  @Field()
  approvedDtae: Date;
  
  @Field()
  investedAmount: number; // (user input)

  @Field()
  paymentMethod: string;

  @Field()
  fundedDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
