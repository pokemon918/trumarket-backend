import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { UserRole } from 'src/users/schemas/user.schema';

@InputType()
export class AddAdminInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @Field(() => UserRole)
  role: UserRole;
}
