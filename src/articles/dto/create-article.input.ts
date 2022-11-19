import { InputType, Field } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';
import { IsMongoIdArray } from 'src/validators/is-mongo-id-array';

@InputType()
export class CreateArticleInput {
  @Field()
  title: LangStringI;

  @Field()
  thumbnail: string;

  @Field()
  content: LangStringI;

  @Field()
  description: LangStringI;

  @Field(() => [String])
  @IsMongoIdArray()
  keywordsIds: string[];
}
