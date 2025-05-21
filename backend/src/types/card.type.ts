import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class CardType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  listId: number;

  @Field(() => [UserType])
  assignees: UserType[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
