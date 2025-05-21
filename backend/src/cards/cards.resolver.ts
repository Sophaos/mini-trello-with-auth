import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardsService } from './cards.service';

@Resolver()
export class CardsResolver {
  constructor(private cardService: CardsService) {}

  @Query(() => String)
  findOne(): string {
    return 'API is running!';
  }

  @Query(() => String)
  findMany(): string {
    return 'API is running!';
  }

  @Mutation(() => String)
  async create(@Args('data') data: any) {
    return this.cardService.signUp(data);
  }

  @Mutation(() => String)
  async update(@Args('data') data: any) {
    return this.cardService.signUp(data);
  }

  @Mutation(() => String)
  async delete(@Args('data') data: any) {
    return this.cardService.signUp(data);
  }
}
