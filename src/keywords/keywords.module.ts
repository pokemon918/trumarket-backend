import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsResolver } from './keywords.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Keyword, KeywordSchema } from './schemas/keyword.schema';
import { Article, ArticleSchema } from 'src/articles/schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keyword.name, schema: KeywordSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  providers: [KeywordsResolver, KeywordsService],
})
export class KeywordsModule {}
