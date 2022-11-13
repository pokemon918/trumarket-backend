import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Article {
  @Field()
  _id: string;

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field()
  content: string;
  
  @Prop()
  @Field()
  contentText: string;

  @Prop()
  @Field()
  thumbnail: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ArticleDocument = Article & Document;

export const ArticleSchema = SchemaFactory.createForClass(Article);
