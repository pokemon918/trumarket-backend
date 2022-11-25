import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/articles/schemas/article.schema';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateKeywordInput } from './dto/create-keyword.input';
import { UpdateKeywordInput } from './dto/update-keyword.input';
import { Keyword, KeywordDocument } from './schemas/keyword.schema';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectModel(Keyword.name)
    private keywordModel: Model<KeywordDocument>,
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  findAll() {
    return this.keywordModel.find();
  }

  getKeyword(_id: string) {
    return this.keywordModel.findOne({ _id });
  }

  create(input: CreateKeywordInput) {
    return this.keywordModel.create(input);
  }

  async updateKeyword({ _id, ...input }: UpdateKeywordInput) {
    const updated = removeNullishAttrs(input);
    await this.keywordModel.updateOne({ _id }, updated);
    return this.keywordModel.findOne({ _id });
  }

  async deleteKeyword(_id: string) {
    const keywordArticles = await this.articleModel.count({
      keywordsIds: { $in: [_id] },
    });

    if (keywordArticles !== 0) throw new BadRequestException();

    const keyword = await this.keywordModel.findOne({ _id });

    if (!keyword) return true;

    await this.keywordModel.deleteOne({ _id });

    return true;
  }
}
