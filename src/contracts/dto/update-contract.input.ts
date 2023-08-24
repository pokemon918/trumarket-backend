import { CreateContractInput } from './create-contract.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContractInput extends PartialType(CreateContractInput) {
  @Field()
  _id: string;
}
