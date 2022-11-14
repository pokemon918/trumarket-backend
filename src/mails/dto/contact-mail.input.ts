import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContactMailInput {
  @Field()
  subject: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  replyTo?: string;
}
