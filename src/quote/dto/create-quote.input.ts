import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'src/validators/is-mongo-id';


@InputType()
export class CreateQuoteInput {
  @Field()
  product: string;

  @Field()
  companyName: string;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  portOfLoading: string;

  @Field()
  portOfArrival: string;

  @Field()
  volume: number;

  @Field()
  price: number;
}
