import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LangString } from 'src/global/schemas/lang-string.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field()
  _id: string;

  @Field()
  @Prop()
  name: LangString;
  
  @Field()
  @Prop()
  thumbnail: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
