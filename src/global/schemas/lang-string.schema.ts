import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LangString {
  @Field()
  en: string;

  @Field()
  es: string;
}
