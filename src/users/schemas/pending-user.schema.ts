import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ collection: 'pendingUsers', timestamps: true })
export class PendingUser {
  @Field()
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  token: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type PendingUserDocument = PendingUser & Document;

export const PendingUserSchema = SchemaFactory.createForClass(PendingUser);
