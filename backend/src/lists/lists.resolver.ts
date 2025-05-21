import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListsService } from './lists.service';

@Resolver()
export class ListsResolver {
  constructor(private listService: ListsService) {}

  @Query(() => String)
  findMany(): string {
    return 'API is running!';
  }

  @Mutation(() => String)
  async create(@Args('data') data: any) {
    return this.listService.signUp(data);
  }

  @Mutation(() => String)
  async update(@Args('data') data: any) {
    return this.listService.signUp(data);
  }

  @Mutation(() => String)
  async delete(@Args('data') data: any) {
    return this.listService.signUp(data);
  }
}
