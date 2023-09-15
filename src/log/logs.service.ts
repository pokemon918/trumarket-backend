import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogInput } from './dto/create-log.input';
import { Log, LogDocument } from './schemas/log.schema';
import { User, UserDocument } from "../users/schemas/user.schema";

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name)
    private logModel: Model<LogDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  findAll() {
    return this.logModel.find().sort({ createdAt: -1 });;
  }

  getLog(_id: string) {
    return this.logModel.findOne({ _id });
  }

  create(input: CreateLogInput) {
    return this.logModel.create(input);
  }

  async deleteLog(_id: string) {
    const log = await this.logModel.findOne({ _id });
    if (!log) return true;

    await this.logModel.deleteOne({ _id });
    return true;
  }

  async getLogUser(userId: string) {
    return this.userModel.findOne({ _id: userId });
  }
}
