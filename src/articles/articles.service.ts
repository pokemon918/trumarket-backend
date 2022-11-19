import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { Article, ArticleDocument } from './schemas/article.schema';
import { LangSearchI } from 'src/global/dto/lang-search.input';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private filesService: FilesService,
  ) {}

  findAll(titleSearch?: LangSearchI, keywordId?: string) {
    const conditions: FilterQuery<ArticleDocument> = {};

    if (titleSearch) {
      const value = titleSearch.value.trim().replace(/\s+/, ' ');

      conditions[`title.${titleSearch.lang}`] = new RegExp(value, 'i');
    }

    if (keywordId) {
      conditions.keywordsIds = { $in: [keywordId] };
    }

    return this.articleModel.find(conditions).populate('keywords');
  }

  findOne(_id: string) {
    return this.articleModel.findOne({ _id }).populate('keywords');
  }

  async create(input: CreateArticleInput) {
    const { _id } = await this.articleModel.create({
      ...input,
      title: {
        en: input.title.en.trim().replace(/\s+/, ' '),
        es: input.title.es.trim().replace(/\s+/, ' '),
      },
    });

    return this.articleModel.findOne({ _id }).populate('keywords');
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
    return this.articleModel.findOne({ _id }).populate('keywords');
  }

  async deleteArticleFiles(article: Article) {
    if (!article.thumbnail) return;
    const thumbnailFilename = article.thumbnail.split('/').slice(-1)[0];
    await this.filesService.deleteFiles([thumbnailFilename]);
  }

  async delete(_id: string) {
    const article = await this.articleModel.findOne({ _id });
    if (!article) return true;

    await this.deleteArticleFiles(article);
    await this.articleModel.deleteOne({ _id });
    return true;
  }
}
