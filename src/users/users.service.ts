import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import genHex from 'src/utils/genHex';
import {
  PendingUser,
  PendingUserDocument,
} from './schemas/pending-user.schema';
import { User, UserBase, UserDocument } from './schemas/user.schema';
import { Field, InputType } from '@nestjs/graphql';
import { Log, LogDocument } from "../log/schemas/log.schema";

@InputType()
export class updateInvestorInput {
  @Field()
  _id: string;

  @Field()
  status: string; // pending, validating, approved
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(PendingUser.name)
    private pendingUserModel: Model<PendingUserDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Log.name)
    private logModel: Model<LogDocument>,
  ) {}

  async getStatistics() {
    const counts = await this.userModel.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);
    const buyer = counts.find((c) => c._id === "buyer")
    const supplier = counts.find((c) => c._id === "seller")
    const investor = counts.find((c) => c._id === "investor")
    return [buyer?buyer.count:0, supplier?supplier.count:0, investor?investor.count:0]
  }

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

  async updateInvestor({ _id, ...input }: updateInvestorInput) {
    const user = await this.userModel.findOne({ _id });
    if (!user) return true;

    await this.userModel.updateOne({ _id }, input);

    return true
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

  async getUsers(
    statusSearch?: string,
    descCreatedAt?: boolean
  ): Promise<User[]> {
    const conditions: FilterQuery<UserDocument> = {};

    if (statusSearch) {
      conditions.status = statusSearch;
    }
    
    return this.userModel.find(conditions).sort({ createdAt: descCreatedAt ? -1 : 1 });
  }

  async getUser(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId });
  }

  async deleteUser(_id: string) {
    const user = await this.userModel.findOne({ _id });
    if (!user) return true;

    await this.userModel.deleteOne({ _id });
    return true;
  }

  async getUserLogs(userId: string) {
    return this.logModel.find({ userId });
  }
}
