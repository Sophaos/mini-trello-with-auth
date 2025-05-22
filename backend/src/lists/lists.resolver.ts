import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { ListType } from 'src/types/list.type';
import { CreateListInput, UpdateListInput } from './lists.input';

@Resolver(() => ListType)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Query(() => [ListType])
  async getListsByBoard(@Args('boardId', { type: () => Int }) boardId: number) {
    return await this.listsService.findByBoardId(boardId);
  }

  @Mutation(() => ListType)
  async createList(@Args('data') data: CreateListInput) {
    return await this.listsService.create(data);
  }

  @Mutation(() => ListType)
  async updateList(@Args('data') data: UpdateListInput) {
    return await this.listsService.update(data);
  }

  @Mutation(() => Boolean)
  async deleteList(@Args('id', { type: () => Int }) id: number) {
    return await this.listsService.delete(id);
  }
}
