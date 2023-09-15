import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LangString } from 'src/global/schemas/lang-string.schema';
import { User } from 'src/users/schemas/user.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Log {
  @Field()
  _id: string;

  @Prop()
  @Field()
  userId: string;

  @Field(() => User)
  user: User;
  
  @Field()
  @Prop()
  description: LangString;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type LogDocument = Log & Document;

export const LogSchema = SchemaFactory.createForClass(Log);
