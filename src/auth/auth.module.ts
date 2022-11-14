import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PendingUser,
  PendingUserSchema,
} from 'src/users/schemas/pending-user.schema';
import { AuthResolver } from './auth.resolver';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { readFileSync } from 'fs';
import {
  ResetPassword,
  ResetPasswordSchema,
} from './schemas/reset-password.schema';
import { join } from 'path';

const publicKey = readFileSync(
  join(__dirname, '..', '..', 'keys', 'jwt.public.key'),
  'utf-8',
);

const privateKey = readFileSync(
  join(__dirname, '..', '..', 'keys', 'jwt.private.key'),
  'utf-8',
);

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PendingUser.name, schema: PendingUserSchema },
      { name: User.name, schema: UserSchema },
      { name: ResetPassword.name, schema: ResetPasswordSchema },
    ]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      publicKey,
      privateKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '365d',
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    AuthResolver,
  ],
  exports: [AuthService, JwtModule, MongooseModule],
  controllers: [AuthController],
})
export class AuthModule {}
