import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { ListType } from 'src/types/list.type';
import {
  CreateListInput,
  DeleteListInput,
  FindListByIdInput,
  MoveListInput,
  UpdateListInput,
} from './lists.input';
import { BoardRoleGuard } from 'src/guards/board-role.guard';
import { UseGuards } from '@nestjs/common';
import { BoardRoles } from 'src/auth/decorators/roles.decorator';
import { BoardRole } from '@prisma/client';

@Resolver(() => ListType)
@UseGuards(BoardRoleGuard)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER, BoardRole.GUEST)
  @Query(() => [ListType])
  async getListsById(@Args('data') data: FindListByIdInput) {
    return await this.listsService.findListById(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => ListType)
  async createList(@Args('data') data: CreateListInput) {
    return await this.listsService.create(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => ListType)
  async updateList(@Args('data') data: UpdateListInput) {
    return await this.listsService.update(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => Boolean)
  async deleteList(@Args('data') data: DeleteListInput) {
    return await this.listsService.delete(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => [ListType])
  async moveList(@Args('data') data: MoveListInput) {
    return await this.listsService.moveListPosition(data);
  }
}
