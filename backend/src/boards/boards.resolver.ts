import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver(() => BoardType)
export class BoardsResolver {
  constructor(private boardService: BoardsService) {}

  @Query(() => String)
  findOne(): string {
    return 'API is running!';
  }

  @Mutation(() => String)
  async create(@Args('data') data: any) {
    return await this.boardService.create(data);
  }

  @Mutation(() => String)
  async update(@Args('data') data: any) {
    return await this.boardService.update(data);
  }

  @Mutation(() => String)
  async delete(@Args('data') data: any) {
    return await this.boardService.delete(data);
  }
}
