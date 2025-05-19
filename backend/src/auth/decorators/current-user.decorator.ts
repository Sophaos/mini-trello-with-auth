import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserType } from 'src/types/user.type';

export const CurrentUser = createParamDecorator<UserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return gqlContext.getContext().req.user;
  },
);
