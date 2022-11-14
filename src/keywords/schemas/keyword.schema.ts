import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Keyword {
  @Field()
  _id: string;

  @Field()
  @Prop()
  name: LangString;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type KeywordDocument = Keyword & Document;

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
