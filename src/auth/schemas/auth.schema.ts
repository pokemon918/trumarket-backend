import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/schemas/user.schema';

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field()
  user: User
}
