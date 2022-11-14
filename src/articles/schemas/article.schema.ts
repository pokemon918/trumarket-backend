import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangString } from 'src/global/schemas/lang-string.schema';
import { Keyword } from 'src/keywords/schemas/keyword.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Article {
  @Field()
  _id: string;

  @Prop()
  @Field()
  thumbnail: string;

  @Prop()
  @Field()
  title: LangString;

  @Prop()
  @Field()
  content: LangString;

  @Prop()
  @Field()
  contentText: LangString;

  @Prop()
  @Field(() => [String])
  keywordsIds: string[];

  @Field(() => [Keyword])
  keywords: Keyword[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ArticleDocument = Article & Document;

export const ArticleSchema = (() => {
  const schema = SchemaFactory.createForClass(Article);

  schema.virtual('keywords', {
    ref: Keyword.name,
    localField: 'keywordsIds',
    foreignField: '_id',
  });

  return schema;
})();
