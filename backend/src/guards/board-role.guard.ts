import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BoardRole } from '@prisma/client';
import { BOARD_ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { GqlContext } from 'src/auth/entities/gql-context';
import { PrismaService } from 'src/prisma/prisma.service';

interface GqlArgsWithBoardId {
  data?: { boardId?: number };
  boardId?: number;
}

@Injectable()
export class BoardRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<BoardRole[]>(
      BOARD_ROLES_KEY,
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext<GqlContext>().req;
    const args = ctx.getArgs<GqlArgsWithBoardId>();
    const boardId = args.data?.boardId ?? args.boardId;

    if (!user || !boardId) {
      throw new ForbiddenException('User or board ID missing');
    }

    const member = await this.prisma.boardMember.findUnique({
      where: {
        userId_boardId: {
          userId: user.id,
          boardId: boardId,
        },
      },
    });

    if (!member || !roles.includes(member.role)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
