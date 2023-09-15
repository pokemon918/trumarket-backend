import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LogsService } from './logs.service';
import { CreateLogInput } from './dto/create-log.input';
import { Log } from './schemas/log.schema';
import { Public } from '../auth/decorators/public.decorator';
import { HasRole } from 'src/auth/decorators/has-role.decorator';
import { UserRole } from 'src/users/schemas/user.schema';
import { User } from "../users/schemas/user.schema";

@Resolver(() => Log)
@HasRole(UserRole.admin)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [Log])
  @Public()
  logs() {
    return this.logsService.findAll();
  }

  @Query(() => Log)
  @Public()
  log(@Args('_id') _id: string) {
    return this.logsService.getLog(_id);
  }

  @Mutation(() => Log)
  createLog(@Args('input') input: CreateLogInput) {
    return this.logsService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteLog(@Args('_id') _id: string) {
    return this.logsService.deleteLog(_id);
  }

  @ResolveField(() => User)
  async user(@Parent() { userId }: Log) {
    return this.logsService.getLogUser(userId);
  }
}
