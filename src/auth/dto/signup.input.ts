import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength, Length } from 'class-validator';
import { UserRole} from 'src/users/schemas/user.schema';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
class SignupBase {
  @Field()
  @MinLength(2)
  fullName: string;

  @Field()
  @MinLength(2)
  companyName: string;

  @Field()
  @Length(2, 2)
  country: string;

  @Field()
  @MinLength(4)
  @MaxLength(24)
  phone: string;

  @Field({ nullable: true })
  website?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  commercialInfo?: Record<string, any>;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class FinalizeSignupInput extends SignupBase {
  @Field()
  @MinLength(1)
  pendingUserToken: string;
}

@InputType()
export class SignupInput extends SignupBase {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
