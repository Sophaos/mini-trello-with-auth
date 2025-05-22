import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { BoardType } from 'src/types/board.type';

@Resolver(() => BoardType)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [BoardType])
  async getBoards(@Args('boardId', { type: () => Int }) boardId: number) {
    return await this.boardsService.findByBoardId(boardId);
  }

  @Query(() => [BoardType])
  async getBoardById(@Args('boardId', { type: () => Int }) boardId: number) {
    return await this.boardsService.findByBoardId(boardId);
  }

  @Mutation(() => BoardType)
  async createBoard(@Args('data') data: CreateListInput) {
    return await this.boardsService.create(data);
  }

  @Mutation(() => BoardType)
  async updateBoard(@Args('data') data: UpdateListInput) {
    return await this.boardsService.update(data);
  }

  @Mutation(() => BoardType)
  async deleteBoard(@Args('id', { type: () => Int }) id: number) {
    return await this.boardsService.delete(id);
  }
}
