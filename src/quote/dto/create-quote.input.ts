import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsMongoId } from 'src/validators/is-mongo-id';


@InputType()
export class CreateQuoteInput {
  @Field()
  @IsMongoId()
  productId: string;

  @Field()
  companyName: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
  
  @Field(() => GraphQLJSONObject, { nullable: true })
  portOfLoading?: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  portOfArrival?: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  paymentTerms?: Record<string, any>;

  @Field()
  volume: number;

  @Field()
  SpecifyDetails: string;
}
