import { AuthKind } from './auth-kind.decorator';

export const Public = () => AuthKind('public');
