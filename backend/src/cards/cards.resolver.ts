import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { CardType } from 'src/types/card.type';

@Resolver(() => CardType)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Query(() => [CardType])
  async getCards(@Args('boardId', { type: () => Int }) boardId: number) {
    return await this.cardsService.findByBoardId(boardId);
  }

  @Mutation(() => CardType)
  async createCard(@Args('data') data: CreateListInput) {
    return await this.cardsService.create(data);
  }

  @Mutation(() => CardType)
  async updateCard(@Args('data') data: UpdateListInput) {
    return await this.cardsService.update(data);
  }

  @Mutation(() => CardType)
  async deleteCard(@Args('id', { type: () => Int }) id: number) {
    return await this.cardsService.delete(id);
  }
}
