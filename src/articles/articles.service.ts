import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { Article, ArticleDocument } from './schemas/article.schema';
import { LangSearch } from 'src/global/dto/lang-search.input';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  findAll(titleSearch?: LangSearch, keywordId?: string) {
    const conditions: FilterQuery<ArticleDocument> = {};

    if (titleSearch) {
      const value = titleSearch.value.trim().replace(/\s+/, ' ');

      conditions[`title.${titleSearch.lang}`] = new RegExp(value, 'i');
    }

    if (keywordId) {
      conditions.keywordsIds = { $in: [keywordId] };
    }

    return this.articleModel.find(conditions);
  }

  findOne(_id: string) {
    return this.articleModel.findOne({ _id });
  }

  create(input: CreateArticleInput) {
    return this.articleModel.create({
      ...input,
      title: {
        en: input.title.en.trim().replace(/\s+/, ' '),
        es: input.title.es.trim().replace(/\s+/, ' '),
      },
    });
  }

  async update({ _id, ...input }: UpdateArticleInput) {
    const updated = removeNullishAttrs({
      ...input,
      title: input.title
        ? {
            en: input.title.en.trim().replace(/\s+/, ' '),
            es: input.title.es.trim().replace(/\s+/, ' '),
          }
        : undefined,
    });

    await this.articleModel.updateOne({ _id }, updated);
    return this.articleModel.findOne({ _id });
  }

  async delete(_id: string) {
    await this.articleModel.deleteOne({ _id });
    return true;
  }
}
