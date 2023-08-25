import { Field, InputType, Int } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoId } from 'src/validators/is-mongo-id';

@InputType()
export class CreateContractInput {
  @Field()
  @IsMongoId()
  productId: string;

  @Field()
  isExisting: boolean;

  @Field()
  portOfLoading: string; // input + country; distinguished by '+'

  @Field()
  portOfArrival: string; // input + country; distinguished by '+'

  @Field()
  departureDate: Date;

  @Field()
  offerPrice: number;

  @Field()
  unit: string;

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

  @Field({ nullable: true })
  attachment?: string;

  @Field()
  brandType: boolean;

  @Field()
  pluType: boolean;

  @Field(() => [String])
  certifications?: [string];

  @Field()
  measure: boolean;

  @Field({ nullable: true })
  duration?: number; // weeks 

  @Field({ nullable: true })
  risk?: string; // ['A', 'B', 'C', 'D']

  @Field({ nullable: true })
  return?: string; // (percentage) or (annual return)

  @Field({ nullable: true })
  supplierId?: string;

  @Field({ nullable: true })
  requiredAmount?: number;

  @Field({ nullable: true })
  nftLink?: string; // website link

  @Field({ nullable: true })
  capitalFunded?: number; // money => refer to step (3): Contract is visible for investors 

  @Field({ nullable: true })
  approvedDate?: Date;
  
  @Field({ nullable: true })
  investedAmount?: number; // (user input)

  @Field({ nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  fundedDate?: Date;
}
