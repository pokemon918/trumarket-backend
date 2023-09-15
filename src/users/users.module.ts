import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PendingUser, PendingUserSchema } from './schemas/pending-user.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Log, LogSchema } from "../log/schemas/log.schema";
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PendingUser.name, schema: PendingUserSchema },
      { name: User.name, schema: UserSchema },
      { name: Log.name, schema: LogSchema },
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
