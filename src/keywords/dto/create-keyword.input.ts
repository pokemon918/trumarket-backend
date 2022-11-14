import { InputType, Field } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';

@InputType()
export class CreateKeywordInput {
  @Field()
  name: LangStringI;
}
