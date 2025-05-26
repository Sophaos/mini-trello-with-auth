import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { CardType } from 'src/types/card.type';
import { CreateCardInput, UpdateCardInput } from './cards.input';
import { BoardRoleGuard } from 'src/guards/board-role.guard';
import { UseGuards } from '@nestjs/common';
import { BoardRoles } from 'src/auth/decorators/roles.decorator';
import { BoardRole } from '@prisma/client';

@Resolver(() => CardType)
@UseGuards(BoardRoleGuard)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER, BoardRole.GUEST)
  @Query(() => [CardType])
  async getCardsByListId(@Args('listId', { type: () => Int }) listId: number) {
    return await this.cardsService.findByListId(listId);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => CardType)
  async createCard(@Args('data') data: CreateCardInput) {
    return await this.cardsService.create(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => CardType)
  async updateCard(@Args('data') data: UpdateCardInput) {
    return await this.cardsService.update(data);
  }

  @BoardRoles(BoardRole.OWNER, BoardRole.MEMBER)
  @Mutation(() => Boolean)
  async deleteCard(@Args('id', { type: () => Int }) id: number) {
    await this.cardsService.delete(id);
    return true;
  }
}
