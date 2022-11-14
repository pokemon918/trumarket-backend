import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
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
import { CurUser } from './decorators/cur-user.decorator';
import { FinalizeSignupInput, SignupInput } from './dto/signup.input';
import { hash, compare } from 'bcrypt';
import { CookieOptions } from 'express';
import { LoginInput } from './dto/login.input';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import sendMail from 'src/utils/sendMail';
import {
  ResetPassword,
  ResetPasswordDocument,
} from './schemas/reset-password.schema';

const { AUTH_FRONTEND_URL: authUrl, COOKIES_BASE_DOMAIN: cookiesBaseDomain } =
  process.env as {
    [k: string]: string;
  };

const randomBytesAsync = promisify(randomBytes);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(PendingUser.name)
    private pendingUserModel: Model<PendingUserDocument>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ResetPassword.name)
    private resetPasswordModel: Model<ResetPasswordDocument>,
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

    const isPasswordMatch = await compare(input.password, user.password);

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
        redirectUrl: authUrl,
        cookie: {
          name: 'token',
          value: token,
          options: {
            domain:
              cookiesBaseDomain !== 'localhost'
                ? `.${cookiesBaseDomain}`
                : cookiesBaseDomain,
            path: '/',
            secure: cookiesBaseDomain !== 'localhost',
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
      redirectUrl: `${authUrl}/signup?pendingUserToken=${puToken}&fullName=${fullName}`,
    };
  }

  private async sendResetLink(to: string, resetToken: string): Promise<void> {
    const resetLink = `${authUrl}/enter-new-password/${resetToken}`;

    await sendMail({
      to,
      subject: "Reset your account's password on TRU Market",
      html:
        "<p>To reset your account's password on TRU Market please click the link below, " +
        '<br />' +
        'or copy it and paste it into a new tab of your browser:</p> ' +
        '<br />' +
        `<p><a href="${resetLink}">${resetLink}</a></p> ` +
        '<br />' +
        '<p style="color: #757575">(The password reset link is valid for 1 hour and usable only once)</p>',
    });
  }

  async beginResetPassword(email: string) {
    const user = await this.userModel
      .findOne({
        email,
      })
      .exec();

    if (!user) {
      throw new BadRequestException('EMAIL_NOT_EXISTS');
    }

    const resetToken = (await randomBytesAsync(36)).toString('hex');

    const expiredAt = new Date(Date.now() + 1000 * 60 * 60);

    await this.resetPasswordModel.create({
      userId: user._id,
      resetToken,
      isUsed: false,
      expiredAt,
    });

    await this.sendResetLink(user.email, resetToken);

    return true;
  }

  async resetPassword(resetToken: string, newPassword: string) {
    if (newPassword.length < 8 || newPassword.length > 255)
      throw new BadRequestException('BAD_REQUEST');

    const passwordReset = await this.resetPasswordModel.findOne({
      resetToken,
      isUsed: false,
      expiredAt: {
        $gt: new Date(),
      },
    });

    if (!passwordReset) throw new BadRequestException('RESET_TOKEN_IS_INVALID');

    const password = await hash(newPassword, 10);

    await this.userModel.updateOne(
      {
        _id: passwordReset.userId,
      },
      {
        password,
        accessKey: Date.now().toString(),
      },
    );

    await this.resetPasswordModel.updateOne(
      {
        _id: passwordReset._id,
      },
      {
        isUsed: true,
      },
    );

    return true;
  }
}
