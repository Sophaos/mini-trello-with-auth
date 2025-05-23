import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { CardType } from 'src/types/card.type';
import { CreateCardInput, UpdateCardInput } from './cards.input';

@Resolver(() => CardType)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Query(() => [CardType])
  async getCardsByListId(@Args('listId', { type: () => Int }) listId: number) {
    return await this.cardsService.findByListId(listId);
  }

  @Mutation(() => CardType)
  async createCard(@Args('data') data: CreateCardInput) {
    return await this.cardsService.create(data);
  }

  @Mutation(() => CardType)
  async updateCard(@Args('data') data: UpdateCardInput) {
    return await this.cardsService.update(data);
  }

  @Mutation(() => Boolean)
  async deleteCard(@Args('id', { type: () => Int }) id: number) {
    await this.cardsService.delete(id);
    return true;
  }
}
