import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LangStringI {
  @Field()
  en: string;

  @Field()
  es: string;
}
