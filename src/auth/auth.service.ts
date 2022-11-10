import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PendingUser,
  PendingUserDocument,
} from 'src/users/schemas/pending-user.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { CurUser } from './cur-user.decorator';
import { FinalizeSignupInput, SignupInput } from './dto/signup.input';
import { hash, compare } from 'bcrypt';
import { CookieOptions } from 'express';
import { Public } from './public.decorator';
import { LoginInput } from './dto/login.input';

const { FULFILLMENT_FRONTEND_URL: fulfillmentUrl, MAIN_DOMAIN: mainDomain } =
  process.env as {
    [k: string]: string;
  };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(PendingUser.name)
    private pendingUserModel: Model<PendingUserDocument>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async signToken({ _id, accessKey }: { _id: string; accessKey: string }) {
    return this.jwtService.sign({
      uid: _id,
      xky: accessKey,
    });
  }

  async signup(input: SignupInput) {
    const password = await hash(input.password, 10);

    const existingUser = await this.userModel.findOne({
      email: input.email,
    });

    if (existingUser) throw new ConflictException();

    const user = await this.userModel.create({
      ...input,
      password,
      accessKey: Date.now().toString(),
    });

    return {
      token: await this.signToken(user),
    };
  }

  async login(input: LoginInput) {
    const user = await this.userModel.findOne({
      email: input.email,
    });

    if (!user || !user.password) throw new UnauthorizedException();

    const isPasswordMatch = await compare(
      input.password,
      user.password,
    );

    if (!isPasswordMatch) throw new UnauthorizedException();

    return {
      token: await this.signToken(user),
    };
  }

  async finalizeSignup({ pendingUserToken, ...input }: FinalizeSignupInput) {
    const user = await this.usersService.activatePendingUser(
      pendingUserToken,
      input,
    );

    return {
      token: await this.signToken(user),
    };
  }

  async validateJwt(sub: string, xky: string): Promise<JwtUser | null> {
    const existingUser = await this.userModel.findOne({
      _id: sub,
      accessKey: xky,
    });

    if (!existingUser) return null;

    return {
      id: existingUser._id,
      role: existingUser.role,
    };
  }

  async handleGoogleRedirect(@CurUser() user: ExternalUser): Promise<{
    redirectUrl: string;
    cookie?: {
      name: string;
      value: string;
      options: CookieOptions;
    };
  }> {
    const existingUser = await this.userModel.findOne({
      email: user.email,
    });

    if (existingUser) {
      const token = await this.signToken(existingUser);

      const YEAR = 1000 * 60 * 60 * 24 * 365;

      return {
        redirectUrl: fulfillmentUrl,
        cookie: {
          name: 'token',
          value: token,
          options: {
            domain: mainDomain !== 'localhost' ? `.${mainDomain}` : mainDomain,
            path: '/',
            secure: mainDomain !== 'localhost',
            expires: new Date(Date.now() + YEAR),
            httpOnly: false,
          },
        },
      };
    }

    const puToken = await this.usersService.createPendingUser(user.email);

    const fullName =
      encodeURIComponent(user.firstName) +
      ' ' +
      encodeURIComponent(user.lastName);

    return {
      redirectUrl: `${fulfillmentUrl}/signup?pendingUserToken=${puToken}&fullName=${fullName}`,
    };
  }
}
