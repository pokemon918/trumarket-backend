import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/users/schemas/user.schema';

@InputType()
class SignupBase {
  @Field()
  fullName: string;

  @Field()
  companyName: string;

  @Field()
  country: string;

  @Field()
  phone: string;

  @Field(() => UserRole)
  role: UserRole;
}

@InputType()
export class FinalizeSignupInput extends SignupBase {
  @Field()
  pendingUserToken: string;
}

@InputType()
export class SignupInput extends SignupBase {
  @Field()
  email: string;

  @Field()
  password: string;
}
