import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurUser } from 'src/auth/decorators/cur-user.decorator';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { User, UserRole } from './schemas/user.schema';
import { UsersService, updateInvestorInput } from './users.service';

@Resolver(() => User)
@HasRole(UserRole.admin)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User, { nullable: true })
  @Public()
  userProfile(@CurUser() user?: JwtUser) {
    return this.userService.findUserProfile(user);
  }

  @Query(() => [Number])
  @Public()
  userStatistics() {
      return this.userService.getStatistics()
  }

  @Query(() => [User])
  users(
    @Args('statusSearch', { nullable: true }) statusSearch?: string, // pending, validating, approved
    @Args('descCreatedAt', { nullable: true }) descCreatedAt?: boolean
  ) {
    return this.userService.getUsers(
      statusSearch,
      descCreatedAt
    );
  }

  @Query(() => User)
  user(@Args('_id') _id: string) {
    return this.userService.getUser(_id);
  }

  @Mutation(() => Boolean)
  updateInvestor(@Args('input') input: updateInvestorInput) {
    return this.userService.updateInvestor(input)
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('_id') _id:string) {
    return this.userService.deleteUser(_id);
  }
}
