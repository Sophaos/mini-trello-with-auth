import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { BoardType } from 'src/types/board.type';
import {
  BoardIdInput,
  CreateBoardInput,
  UpdateBoardInput,
} from './boards.input';
import { BoardRoles } from 'src/auth/decorators/roles.decorator';
import { BoardRole } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { BoardRoleGuard } from 'src/guards/board-role.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserType } from 'src/types/user.type';

@Resolver(() => BoardType)
@UseGuards(BoardRoleGuard)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  // TODO: ADMIN ?!?
  // @BoardRoles(BoardRole.MEMBER, BoardRole.GUEST)
  // @Query(() => [BoardType])
  // async getAllBoards() {
  //   return await this.boardsService.findAll();
  // }

  @Mutation(() => BoardType)
  async createBoard(
    @Args('data') data: CreateBoardInput,
    @CurrentUser() user: UserType,
  ) {
    return await this.boardsService.create(data.title, user.id);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER, BoardRole.GUEST)
  @Query(() => BoardType, { name: 'board' })
  async getBoardById(@Args('data') data: BoardIdInput) {
    return await this.boardsService.findByBoardId(data);
  }

  @BoardRoles(BoardRole.OWNER)
  @Mutation(() => BoardType)
  async updateBoard(@Args('data') data: UpdateBoardInput) {
    return await this.boardsService.update(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => Boolean)
  async deleteBoard(@Args('data') data: BoardIdInput) {
    await this.boardsService.delete(data);
    return true;
  }

  // TODO: add transfer ownership
}
