import { Field, InputType } from '@nestjs/graphql';
import { Lang } from '../enums/lang.enum';

@InputType()
export class LangSearchI {
  @Field(() => Lang)
  lang: Lang;

  @Field()
  value: string;
}
