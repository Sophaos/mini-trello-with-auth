import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CardType } from './card.type';

@ObjectType()
export class ListType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  boardId: number;

  @Field(() => [CardType])
  cards: CardType[];
}
