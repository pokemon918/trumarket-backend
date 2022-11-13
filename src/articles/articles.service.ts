import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { Article, ArticleDocument } from './schemas/article.schema';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  findAll() {
    return this.articleModel.find();
  }

  findOne(_id: string) {
    return this.articleModel.findOne({ _id });
  }

  create(input: CreateArticleInput) {
    return this.articleModel.create(input);
  }

  async update({ _id, ...input }: UpdateArticleInput) {
    const updated = removeNullishAttrs(input);
    await this.articleModel.updateOne({ _id }, updated);
    return this.articleModel.findOne({ _id });
  }

  async delete(_id: string) {
    await this.articleModel.deleteOne({ _id });
    return true;
  }
}
