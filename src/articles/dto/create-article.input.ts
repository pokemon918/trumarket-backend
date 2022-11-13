import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  thumbnail: string;

  @Field()
  content: string;

  @Field()
  contentText: string;
}
