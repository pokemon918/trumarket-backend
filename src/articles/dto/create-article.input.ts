import { InputType, Field } from '@nestjs/graphql';
import { LangStringI } from 'src/global/dto/lang-string.input';

@InputType()
export class CreateArticleInput {
  @Field()
  title: LangStringI;

  @Field()
  thumbnail: string;

  @Field()
  content: LangStringI;

  @Field()
  contentText: LangStringI;
}
