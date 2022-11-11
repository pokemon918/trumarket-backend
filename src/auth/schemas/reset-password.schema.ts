import { ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@ObjectType()
@Schema({ collection: 'resetPasswords', timestamps: true })
export class ResetPassword {
  @Prop()
  userId: string

  @Prop()
  resetToken: string

  @Prop()
  isUsed: boolean

  @Prop()
  expiredAt: Date

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export type ResetPasswordDocument = ResetPassword & Document

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword)
