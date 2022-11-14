import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRoleInput {
  buyer = 'buyer',
  seller = 'seller',
  investor = 'investor',
}

export enum UserRole {
  admin = 'admin',
  buyer = 'buyer',
  seller = 'seller',
  investor = 'investor',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(UserRoleInput, { name: 'UserRoleInput' });

export class UserBase {
  fullName: string;
  companyName: string;
  country: string;
  phone: string;
  role: UserRole | UserRoleInput;
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

  @Prop()
  @Field()
  country: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field(() => UserRole)
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
