import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { BoardType } from 'src/types/board.type';
import { CreateBoardInput, UpdateBoardInput } from './boards.input';

@Resolver(() => BoardType)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [BoardType])
  async getAllBoards() {
    return await this.boardsService.findAll();
  }

  @Query(() => BoardType)
  async getBoardById(@Args('boardId', { type: () => Int }) boardId: number) {
    return await this.boardsService.findByBoardId(boardId);
  }

  @Mutation(() => BoardType)
  async createBoard(@Args('data') data: CreateBoardInput) {
    return await this.boardsService.create(data);
  }

  @Mutation(() => BoardType)
  async updateBoard(@Args('data') data: UpdateBoardInput) {
    return await this.boardsService.update(data);
  }

  @Mutation(() => Boolean)
  async deleteBoard(@Args('id', { type: () => Int }) id: number) {
    await this.boardsService.delete(id);
    return true;
  }
}
