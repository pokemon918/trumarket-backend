import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  buyer = 'buyer',
  seller = 'seller',
  investor = 'investor',
}

registerEnumType(UserRole, { name: 'UserRole' });

export class UserBase {
  fullName: string;
  companyName: string;
  // country: string;
  phone: string;
  role: UserRole;
}

@ObjectType()
@Schema({ timestamps: true })
export class User implements UserBase {
  @Field()
  _id: string;

  @Prop({ unique: true })
  @Field()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @Field()
  fullName: string;

  @Prop()
  @Field()
  companyName: string;

  // @Prop()
  // @Field()
  // country: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  role: UserRole;

  @Prop()
  accessKey: string;

  @Prop()
  @Field()
  createdAt: Date;

  @Prop()
  @Field()
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
