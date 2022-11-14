import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangString } from 'src/global/schemas/lang-string.schema';

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ArticleDocument = Article & Document;

export const ArticleSchema = SchemaFactory.createForClass(Article);
