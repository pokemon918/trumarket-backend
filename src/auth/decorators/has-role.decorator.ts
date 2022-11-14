import { UserRole } from '../../users/schemas/user.schema';
import { AuthKind } from './auth-kind.decorator';

export const HasRole = (...roles: UserRole[]) => AuthKind(...roles);
