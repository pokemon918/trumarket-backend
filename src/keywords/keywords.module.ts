import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsResolver } from './keywords.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Keyword, KeywordSchema } from './schemas/keyword.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keyword.name, schema: KeywordSchema },
    ]),
  ],
  providers: [KeywordsResolver, KeywordsService]
})
export class KeywordsModule {}
