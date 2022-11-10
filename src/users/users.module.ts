import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PendingUser, PendingUserSchema } from './schemas/pending-user.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PendingUser.name, schema: PendingUserSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
