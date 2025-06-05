import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardMemberService } from './board-member.service';
import { BoardMemberType } from 'src/types/board-member.type';
import {
  CreateBoardMemberInput,
  UpdateBoardMemberInput,
} from './board-member.input';
import { BoardRole } from '@prisma/client';
import { BoardRoles } from 'src/auth/decorators/roles.decorator';
import { BoardRoleGuard } from 'src/guards/board-role.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => BoardMemberType)
@UseGuards(BoardRoleGuard)
export class BoardMemberResolver {
  constructor(private readonly boardMemberService: BoardMemberService) {}

  @Query(() => [BoardMemberType])
  async getBoardMembers(@Args('boardId', { type: () => Int }) boardId: number) {
    return this.boardMemberService.findByBoardId(boardId);
  }

  @BoardRoles(BoardRole.OWNER)
  @Mutation(() => BoardMemberType)
  async addBoardMember(@Args('data') data: CreateBoardMemberInput) {
    return this.boardMemberService.create(data);
  }

  @Mutation(() => BoardMemberType)
  async updateBoardMember(@Args('data') data: UpdateBoardMemberInput) {
    return this.boardMemberService.update(data);
  }

  @BoardRoles(BoardRole.OWNER)
  @Mutation(() => Boolean)
  async removeBoardMember(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('boardId', { type: () => Int }) boardId: number,
  ) {
    return this.boardMemberService.delete(userId, boardId);
  }
}
