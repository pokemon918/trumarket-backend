import { registerEnumType } from '@nestjs/graphql';

export enum Lang {
  en = 'en',
  es = 'es',
}

registerEnumType(Lang, { name: 'Lang' });
