import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { ListType } from './list.type';
import { BoardMemberType } from './board-member.type';

@ObjectType()
export class BoardType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  ownerId: number;

  @Field(() => UserType)
  owner: UserType;

  @Field(() => [BoardMemberType])
  members: BoardMemberType[];

  @Field(() => [ListType])
  lists: ListType[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
