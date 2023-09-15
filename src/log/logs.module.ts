import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsResolver } from './logs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './schemas/log.schema';
import { FilesModule } from 'src/files/files.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [LogsResolver, LogsService],
})
export class LogsModule {}
