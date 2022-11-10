import { Resolver, Query } from '@nestjs/graphql';
import { CurUser } from 'src/auth/cur-user.decorator';
import { Public } from 'src/auth/public.decorator';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor (private userService: UsersService) {}

  @Query(() => User, { nullable: true })
  @Public()
  userProfile(@CurUser() user?: JwtUser) {
    return this.userService.findUserProfile(user);
  }
}
