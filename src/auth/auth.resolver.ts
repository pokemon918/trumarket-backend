import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { FinalizeSignupInput, SignupInput } from './dto/signup.input';
import { AddAdminInput } from "./dto/addAdmin.input";
import { Public } from './decorators/public.decorator';
import { Auth } from './schemas/auth.schema';

@Resolver(() => Auth)
@Public()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('input') input: SignupInput): Promise<Auth> {
    return this.authService.signup(input);
  }

  @Mutation(() => Auth)
  async addAdmin(@Args('input') input: AddAdminInput): Promise<Auth> {
    return this.authService.addAdmin(input);
  }

  @Mutation(() => Auth)
  async finalizeSignup(
    @Args('input') input: FinalizeSignupInput,
  ): Promise<Auth> {
    return this.authService.finalizeSignup(input);
  }

  @Mutation(() => Boolean)
  async registered(@Args('email') email: string): Promise<boolean> {
    return this.authService.registered(email);
  }

  @Mutation(() => Auth)
  async login(@Args('input') input: LoginInput): Promise<Auth> {
    return this.authService.login(input);
  }

  @Mutation(() => Boolean)
  async beginResetPassword(@Args('email') email: string) {
    return this.authService.beginResetPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('resetToken') resetToken: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(resetToken, newPassword);
  }
}
