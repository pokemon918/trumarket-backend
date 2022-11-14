import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '../../users/schemas/user.schema';
import extractReq from '../../utils/extractReq';
import { AuthKindT, AUTH_KIND_KEY } from '../decorators/auth-kind.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authKind = this.reflector.getAllAndOverride<AuthKindT | undefined>(
      AUTH_KIND_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (
      authKind &&
      authKind.length > 0 &&
      authKind.every((k) => k === 'public')
    ) {
      return true;
    }

    const { user } = extractReq(ctx);

    if (!user || user.source !== 'jwt') {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const requiredRoles = (
      authKind ? authKind.filter((k) => k !== 'public') : []
    ) as UserRole[];

    if (
      requiredRoles.length === 0 ||
      requiredRoles.some((requiredRole) => requiredRole === user.role)
    ) {
      return true;
    }

    throw new ForbiddenException('FORBIDDEN');
  }
}
