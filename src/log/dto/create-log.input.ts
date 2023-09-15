import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'src/validators/is-mongo-id';
import { LangStringI } from 'src/global/dto/lang-string.input';

@InputType()
export class CreateLogInput {
  @Field()
  @IsMongoId()
  userId: string;
  
  @Field()
  description: LangStringI;
}
