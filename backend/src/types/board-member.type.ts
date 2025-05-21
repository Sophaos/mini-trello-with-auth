import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BoardRole } from '@prisma/client'; // or define enum manually
import { UserType } from './user.type';
import { BoardType } from './board.type';

// Register the enum if you're using it from Prisma
registerEnumType(BoardRole, {
  name: 'BoardRole',
});

@ObjectType()
export class BoardMemberType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  boardId: number;

  @Field(() => BoardRole)
  role: BoardRole;

  @Field(() => Date)
  joinedAt: Date;

  @Field(() => UserType)
  user: UserType;

  @Field(() => BoardType)
  board: BoardType;
}
