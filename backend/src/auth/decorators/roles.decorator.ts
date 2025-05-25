import { SetMetadata } from '@nestjs/common';
import { BoardRole } from '@prisma/client';

export const BOARD_ROLES_KEY = 'board_roles';
export const BoardRoles = (...roles: BoardRole[]) =>
  SetMetadata(BOARD_ROLES_KEY, roles);
