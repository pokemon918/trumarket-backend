import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { FinalizeSignupInput, SignupInput } from './dto/signup.input';
import { Public } from './public.decorator';
import { Auth } from './schemas/auth.schema';

@Resolver(() => Auth)
@Public()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(
    @Args('input') input: SignupInput,
  ): Promise<Auth> {
    return this.authService.signup(input);
  }

  @Mutation(() => Auth)
  async login(
    @Args('input') input: LoginInput,
  ): Promise<Auth> {
    return this.authService.login(input);
  }

  @Mutation(() => Auth)
  async finalizeSignup(
    @Args('input') input: FinalizeSignupInput,
  ): Promise<Auth> {
    return this.authService.finalizeSignup(input);
  }
}
