import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import genHex from 'src/utils/genHex';
import {
  PendingUser,
  PendingUserDocument,
} from './schemas/pending-user.schema';
import { User, UserBase, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(PendingUser.name)
    private pendingUserModel: Model<PendingUserDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createPendingUser(email: string): Promise<string> {
    const pendingUser = await this.pendingUserModel.findOne({
      email,
    });

    if (pendingUser) return pendingUser.token;

    const token = await genHex(64);

    await this.pendingUserModel.create({
      email,
      token,
    });

    return token;
  }

  async activatePendingUser(pendingUserToken: string, info: UserBase) {
    const pendingUser = await this.pendingUserModel.findOne({
      token: pendingUserToken,
    });

    if (!pendingUser) throw new UnauthorizedException();

    const { email } = pendingUser;

    const finalInfo = {
      email,
      ...info,
      password: null,
      accessKey: Date.now().toString(),
    };

    const user = await this.userModel.create(finalInfo);

    await this.pendingUserModel.deleteMany({ email });

    return user;
  }

  async findUserProfile(user?: JwtUser) {
    if (!user) return null;

    return await this.userModel.findOne({
      _id: user._id,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUser(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId });
  }
}
