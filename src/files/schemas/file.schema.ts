import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class File {
  @Prop()
  filename: string;

  @Prop()
  relationId?: string;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
