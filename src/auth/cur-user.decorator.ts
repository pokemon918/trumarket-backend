import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import extractReq from 'src/utils/extractReq';

export const CurUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = extractReq(ctx);

    return req.user;
  },
);
