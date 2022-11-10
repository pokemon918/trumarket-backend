import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

const extractReq = (ctx: ExecutionContext): Request => {
  const ctxType = ctx.getType<GqlContextType>();

  let req: Request;

  if (ctxType === 'http') {
    req = ctx.switchToHttp().getRequest();
  } else if (ctxType === 'graphql') {
    req = GqlExecutionContext.create(ctx).getContext().req;
  } else {
    throw new Error(
      `please implement "${ctxType}" context type in "getRequest" util`,
    );
  }

  return req;
};

export default extractReq;
