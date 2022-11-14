import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/schemas/user.schema';

export const AUTH_KIND_KEY = 'AUTH_KIND';

export type AuthKindT = (UserRole | 'public')[];

export const AuthKind = (...kind: AuthKindT) =>
  SetMetadata(AUTH_KIND_KEY, kind);
