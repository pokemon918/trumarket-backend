import { InputType, Field } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: LangStringI;
  
  @Field()
  thumbnail: string;
}
