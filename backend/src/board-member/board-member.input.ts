import { Field, InputType, Int } from '@nestjs/graphql';
import { BoardRole } from '@prisma/client';

@InputType()
export class UpdateBoardMemberInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  boardId: number;

  @Field(() => BoardRole)
  role: BoardRole;
}

@InputType()
export class CreateBoardMemberInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  boardId: number;

  @Field(() => BoardRole, { nullable: true })
  role?: BoardRole;
}
