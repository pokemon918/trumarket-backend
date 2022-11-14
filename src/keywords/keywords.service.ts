import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { Keyword, KeywordDocument } from './schemas/keyword.schema';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectModel(Keyword.name)
    private keywordModel: Model<KeywordDocument>,
  ) {}

  findAll() {
    return this.keywordModel.find();
  }

  create(input: CreateKeywordInput) {
    return this.keywordModel.create(input);
  }
}
